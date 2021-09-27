import React from "react"
import { connect } from 'react-redux'
import { updateBoard } from "../store/board.actions"
import { MembersListBoard } from "./MembersListBoard"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: '',
    isStarred: false,
    isMenuOpen: false
  }

  componentDidMount() {
    const isStarred = true
    this.setState({ title: this.props.board.boardTitle, isStarred })
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
    const { board, onUpdateBoard } = this.props
    if (!title) title = 'Untitled'
    board.boardTitle = title
    onUpdateBoard(board)
    this.toggleChangeTitle()
  }

  onToggleStarBoard = () => {
    const { board, onUpdateBoard } = this.props
    // const isStarred = this.state
    // board.isStarred = !isStarred
    // onUpdateBoard(board)
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  render() {
    const { board } = this.props
    const { title, isEditTitle, isStarred, isMenuOpen } = this.state

    return (
      <div className="board-header flex space-between">
        <div className="header-left flex">
          {!isEditTitle && <h1 onClick={this.toggleChangeTitle}>{board.boardTitle}</h1>}
          {isEditTitle &&
            <form onSubmit={this.saveBoardTitle}>
              <input
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
          <button onClick={this.onToggleStarBoard}>
            {isStarred ? <AiFillStar /> : <AiOutlineStar />}
          </button>
          <div className="board-members">
            <MembersListBoard members={board.boardMembers} />
          </div>
        </div>
        <div className="header-right">
          {!isMenuOpen && <button onClick={this.toggleMenu}> Show menu</button>}
          {isMenuOpen && <TemporaryDrawer toggleMenu={this.toggleMenu} board={board} />}
        </div>
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