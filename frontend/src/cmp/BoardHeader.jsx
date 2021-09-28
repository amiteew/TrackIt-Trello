import React from "react"
import { connect } from 'react-redux'
import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';
import { BsThreeDots } from "react-icons/bs";

import { userService } from "../services/user.service"
import { updateBoard } from "../store/board.actions"
import { MembersListBoard } from "./MembersListBoard"
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: '',
    isMenuOpen: false
  }

  componentDidMount() {
    this.setState({ title: this.props.board.boardTitle })
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
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  render() {
    const { board, loggedInUser } = this.props
    const { title, isEditTitle, isMenuOpen } = this.state
    const isStarred = userService.isBoardStarred(board, loggedInUser._id)
    return (
      <div className="board-header-btn board-header flex align-center space-between">
        <div className="header-left flex">
          {!isEditTitle && <h1 className="header-title" onClick={this.toggleChangeTitle}>{board.boardTitle}</h1>}
          {isEditTitle &&
            <form onSubmit={this.saveBoardTitle}>
              <input
                className="header-title-input"
                autoFocus
                name="boardTitle"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={this.handleChange}
                onBlur={this.saveBoardTitle}
              />
            </form>
          }
          <button className="board-header-btn star" onClick={this.onToggleStarBoard}>
            <IconContext.Provider value={{ className: `star-icon${isStarred ? " active" : ""}` }} >
              <FiStar />
            </IconContext.Provider>
          </button>
          <div className="board-members">
          {/* <div className="board-header-btn board-members"> */}
            <MembersListBoard members={board.boardMembers} />
          </div>
        </div>
        {!isMenuOpen && <div className="board-header-btn show-menu" onClick={this.toggleMenu}>
          <span className="icon"><BsThreeDots /> </span>
          <span className="title">Show menu</span>
        </div>}
        {isMenuOpen && <TemporaryDrawer toggleMenu={this.toggleMenu} board={board} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardReducer.boards,
    loggedInUser: state.userReducer.loggedInUser
  }
}

const mapDispatchToProps = {
  updateBoard
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)