import React from "react"
import { connect } from 'react-redux'
import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';
import { BsThreeDots } from "react-icons/bs";
import AutosizeInput from 'react-input-autosize';

import { userService } from "../services/user.service"
import { updateBoard, setNotif } from "../store/board.actions"
import { MembersListBoard } from "./MembersListBoard"
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';
import { Loading } from "./Loading";
import { DynamicBoardMenu } from "./DynamicBoardMenu";
import { socketService } from '../services/socket.service';

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: '',
    isMenuOpen: false,
    menuTitle: 'Menu',
    menuTarget: 'main'
  }

  componentDidMount() {
    this.setState({ title: this.props.board.boardTitle })
    socketService.on('sending notification', (isNotif) => {
      this.props.setNotif(isNotif)
    })
  }

  handleChange = (ev) => {
    const value = ev.target.value
    this.setState({ title: value })
  }

  toggleChangeTitle = () => {
    const { isEditTitle } = this.state
    this.setState({ isEditTitle: !isEditTitle })
  }

  saveBoardTitle = (ev) => {
    ev.preventDefault()
    let { title } = this.state
    const { board, updateBoard } = this.props
    if (!title) title = 'Untitled'
    if (title === board.boardTitle) {
      this.toggleChangeTitle()
      return
    }
    board.boardTitle = title
    updateBoard(board, "changed board title")
    this.toggleChangeTitle()
  }

  onToggleStarBoard = () => {
    const { board, updateBoard, loggedInUser } = this.props
    const updatedBoard = userService.toggleStarBoard(board, loggedInUser._id)
    updateBoard(updatedBoard)
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state
    this.setState(prevState => ({ ...prevState, isMenuOpen: !isMenuOpen }))
    // this.setState(prevState => ({ ...prevState, isMenuOpen: !isMenuOpen, menuTitle: 'Menu', menuTarget: 'main' }))
  }

  changeMenu = (menuTitle, menuTarget) => {
    this.setState(prevState => ({ ...prevState, menuTitle, menuTarget }))
  }

  render() {
    const { board, loggedInUser } = this.props
    const { title, isEditTitle, isMenuOpen, menuTarget, menuTitle, notification } = this.state
    const isStarred = userService.isBoardStarred(board, loggedInUser._id)
    return (
      <div className="board-header flex align-center space-between wrap">
        <div className="header-left flex align-center">
          {!isEditTitle && <h1 className="board-btn header-title" onClick={this.toggleChangeTitle}>{board.boardTitle}</h1>}
          {isEditTitle &&
            <form onSubmit={this.saveBoardTitle}>
              <AutosizeInput
                className="header-title-input"
                autoFocus
                name="boardTitle"
                type="text"
                placeholder="Enter Title"
                value={title}
                inputStyle={{ fontSize: 18, fontWeight: 700, color: "#172b4d" }}
                onChange={this.handleChange}
                onBlur={this.saveBoardTitle}
              />
            </form>
          }
          <button className={`board-btn star ${isStarred ? " active" : ""}`} onClick={this.onToggleStarBoard}>
            <IconContext.Provider value={{ className: "star-icon" }} >
              <FiStar />
            </IconContext.Provider>
          </button>
          <span className="board-header-divider"></span>
          <div className="board-members">
            {/* <div className="board-header-btn board-members"> */}
            <MembersListBoard members={board.boardMembers} />
          </div>
        </div>
        {!isMenuOpen && <button className="board-btn show-menu flex align-center" onClick={this.toggleMenu}>
          <span className="icon flex justify-center align-center"><BsThreeDots /> </span>
          <span className="title">Show menu</span>
        </button>}
        {isMenuOpen && <DynamicBoardMenu board={board} toggleMenu={this.toggleMenu}
          isMenuOpen={isMenuOpen} target={menuTarget} title={menuTitle} changeMenu={this.changeMenu} />}
        {/* {isMenuOpen && <TemporaryDrawer board={board} toggleMenu={this.toggleMenu} isMenuOpen={isMenuOpen} />} */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userReducer.loggedInUser,
    notifCount: state.boardReducer.notifCount
  }
}

const mapDispatchToProps = {
  updateBoard,
  setNotif,
  
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)