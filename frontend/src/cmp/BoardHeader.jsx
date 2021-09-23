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
    const { title } = this.state
    if (!title) return
    const { board, onUpdateBoard } = this.props
    board.boardTitle = title
    onUpdateBoard(board)
    this.toggleChangeTitle()
  }

  render() {
    const { board } = this.props
    const { title, isEditTitle } = this.state

    return (
      <div className="board-header">
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

      </div>
    )
  }
}