import React from "react"

export class BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: ''
  }

  componentDidMount() {
    this.setState({ title: this.props.board.boardTitle })
    // this.props.loadUsers();
    // this.props.loadBoard();
  }

  handleChange = (ev) => {
    const value = ev.target.value
    this.setState({ title: value })
    // this.setState((prevState) => ({ ...prevState, title: value }))
  }

  toggleChangeTitle = () => {
    const { isEditTitle } = this.state
    this.setState({ isEditTitle: !isEditTitle })
    // this.setState((prevState) => ({ ...prevState, isEditTitle: !isEditTitle }))
  }

  saveBoardTitle = (ev) => {
    ev.preventDefault()
    let { title } = this.state
    const { board, onUpdateBoard } = this.props
    if (!title) title='Untitled'
    board.boardTitle = title
    onUpdateBoard(board)
    this.toggleChangeTitle()
  }

  onToggleStarBoard = () => {
    const { board, onUpdateBoard } = this.props
    const isStarred = board.isStarred
    board.isStarred = !isStarred
    onUpdateBoard(board)
  }

  render() {
    const { board } = this.props
    const { title, isEditTitle } = this.state

    return (
      <div className="board-header flex">
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
        <button onClick={this.onToggleStarBoard}>{board.isStarred ? '🌟' : '⭐'}</button>

      </div>
    )
  }
}