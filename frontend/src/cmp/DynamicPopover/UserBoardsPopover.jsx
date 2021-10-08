import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FiStar } from 'react-icons/fi';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';
import { loadBoards, updateBoard } from '../../store/board.actions'

class _UserBoardsPopover extends React.Component {

    async componentDidMount() {
        const { loggedInUser, boards } = this.props
        if (loggedInUser && !boards.length) await this.props.loadBoards(loggedInUser._id)
    }

    toggleStar = (ev, board) => {
        ev.stopPropagation()
        const { loggedInUser, updateBoard } = this.props
        const updatedBoard = userService.toggleStarBoard(board, loggedInUser._id)
        updateBoard(updatedBoard)
        console.log('updated star board');
    }

    getBoardBtns = (boards) => {
        console.log('this.props:', this.props);
        return boards.map(board => {
            const bgStyle = utilService.getFormattedBgStyle(board.boardStyle)
            return <div key={board._id} className="board-menu-btn flex align-center">
                <Link key={board._id} className="flex align-center" to={`/boards/${board._id}`} onClick={() => this.props.handleClose()}>
                    <span className="board-bg" style={bgStyle}></span>
                    <p>{board.boardTitle}</p>
                </Link >
                {(this.props.type === 'starredBoards') ? <button className="star-board" onClick={(ev) => this.toggleStar(ev, board)}><FiStar /></button> : <></>}
            </div>
            // <button key={board._id} className="board-menu-btn flex align-center" onClick={() => this.props.goToBoard(board._id)}>
            //      <span className="board-bg" style={bgStyle}></span>
            //      <p>{board.boardTitle}</p>
            //      {(this.props.type === 'starredBoards') ? <span onClick={(ev) => this.toggleStar(ev, board)}><FiStar /></span> : <></>}
            //  </button>
        })
    }

    getfilteredBoards = (type) => {
        const { boards, loggedInUser } = this.props
        return userService.filterUserBoards(boards, loggedInUser._id, type)
    }

    goToBoard = (boardId) => {
        this.props.handleClose()
        this.props.history.push(`/boards/${boardId}`)
    }

    render() {
        const { type } = this.props
        const boardsToShow = (type === 'userBoards') ? this.getfilteredBoards("owner") : this.getfilteredBoards("starred")
        const guestBoards = (type === 'userBoards') ? this.getfilteredBoards("guest") : []
        if (!boardsToShow.length && !guestBoards.length) return <div className="no-boards">No boards yet...</div>
        return (
            <div className="user-boards-popover">
                {type === 'userBoards' && <>
                    {boardsToShow.length ? <div className="owner-section">
                        <h4>Your Boards</h4>
                        <div className="owned-boards">
                            {this.getBoardBtns(boardsToShow)}
                        </div>
                    </div> : <></>}
                    {guestBoards.length ? <div className="guest-section">
                        <h4>Guest Boards</h4>
                        <div className="guest-boards">
                            {this.getBoardBtns(guestBoards)}
                        </div>
                    </div> : <></>}
                </>}
                {type === 'starredBoards' ? <div className="starred-section">
                    <div className="starred-boards">
                        {this.getBoardBtns(boardsToShow)}
                    </div>
                </div> : <></>
                }
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
    loadBoards,
    updateBoard
}

export const UserBoardsPopover = connect(mapStateToProps, mapDispatchToProps)(_UserBoardsPopover)