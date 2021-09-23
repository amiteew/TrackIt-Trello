import React from "react"
import { connect } from "react-redux"

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: ''
  }

  componentDidMount() {
    // this.props.loadUsers();
    // this.props.loadBoard();
  }

  handleChange = (ev) => {
    const value = ev.target.value
    this.setState((prevState) => ({ ...prevState, title: value }))
  }

  toggleChangeTitle = () => {
    const { isEditTitle } = this.state
    this.setState((prevState) => ({ ...prevState, isEditTitle: !isEditTitle }))
  }

  onSaveBoardTitle = () => {
    ev.preventDefault()
    const { title } = this.state
    if (!title) return
    const { board, onUpdateBoard } = this.props
    board.boardTitle = title
    onUpdateBoard(board)
    toggleChangeTitle()
  }

  render() {
    const { board } = this.props
    const { isEditTitle } = this.state

    return (
      <div className="board-header">
        {!isEditTitle && <h1 onClick={this.toggleChangeTitle}>{board.boardTitle}</h1>}
        {isEditTitle &&
          <form onSubmit={this.onSaveBoardTitle}>
            <input
              name="boardTitle"
              id="boardTitle"
              type="text"
              placeholder="Enter Title"
              value={board.boardTitle}
              onChange={this.handleChange}
            />
          </form>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    user: state.userModule.user,
    boards: state.boardModule.boards,
  }
}
const mapDispatchToProps = {
  loadUsers,
  loadBoards,
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
