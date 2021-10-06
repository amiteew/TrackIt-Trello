import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';
import { loadBoards } from '../../store/board.actions'

class _UserBoardsPopover extends React.Component {

    async componentDidMount() {
        const { loggedInUser, boards } = this.props
        if (loggedInUser && !boards.length) await this.props.loadBoards(loggedInUser._id)
    }

    getBoardBtns = (boards) => {
        return boards.map(board => {
            const bgStyle = utilService.getFormattedBgStyle(board.boardStyle)
            return <Link key={board._id} className="board-menu-btn flex align-center" to={`/boards/${board._id}`} onClick={() => this.props.handleClose()}>
                <span className="board-bg" style={bgStyle}></span>
                <p>{board.boardTitle}</p>
            </Link >
        })
    }

    render() {
        const { boards, loggedInUser } = this.props
        console.log('boards',boards);
        const starredBoards = userService.filterUserBoards(boards, loggedInUser._id, "starred")
        const nonStarredBoards = userService.filterUserBoards(boards, loggedInUser._id, "non-starred")
        if (!starredBoards.length && !nonStarredBoards.length) return <div>No boards yet...</div>
        return (
            <div className="user-boards-popover">
                {starredBoards.length ? <div className="starred-section">
                    <h4>Starred Boards</h4>
                    <div className="starred-boards">
                        {this.getBoardBtns(starredBoards)}
                    </div>
                </div> : <></>}
                {nonStarredBoards.length ? <div className="starred-section">
                    {starredBoards.length ? <h4>Other Boards</h4> : <></>}
                    <div className="boards">
                        {this.getBoardBtns(nonStarredBoards)}
                    </div>
                </div> : <></>}
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
    loadBoards
}

export const UserBoardsPopover = connect(mapStateToProps, mapDispatchToProps)(_UserBoardsPopover)