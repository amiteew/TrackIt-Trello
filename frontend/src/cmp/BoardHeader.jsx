import React from "react"
import { connect } from 'react-redux'
import { updateUser } from "../store/user.actions"
import { MembersListBoard } from "./MembersListBoard"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: '',
    isStarred :null
  }

  componentDidMount() {
    const isStarred = this.props.loggedInUser.memberInBoards.find(board => this.props.board._id === board.boardId).isStarred
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

  render() {
    const { board } = this.props
    const { title, isEditTitle, isStarred } = this.state

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
            {board.isStarred ? <AiFillStar /> : <AiOutlineStar />}
          </button>
          <div className="board-members">
            <MembersListBoard members={board.boardMembers} />
          </div>
        </div>
        <div className="header-right">
          <button>Show menu</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userReducer.loggedInUser
  }
}

const mapDispatchToProps = {
  updateUser
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)