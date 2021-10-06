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

    getfilteredBoards = (type) => {
        const { boards, loggedInUser } = this.props
        return userService.filterUserBoards(boards, loggedInUser._id, type)
    }

    render() {
        console.log('props:', this.props);
        const userOwnedBoards = this.getfilteredBoards("owner")
        const guestBoards = this.getfilteredBoards("guest")
        if (!userOwnedBoards.length && !guestBoards.length) return <div>No boards yet...</div>
        return (
            <div className="user-boards-popover">
                {userOwnedBoards.length ? <div className="owner-section">
                    <h4>Your Boards</h4>
                    <div className="starred-boards">
                        {this.getBoardBtns(userOwnedBoards)}
                    </div>
                </div> : <></>}
                {guestBoards.length ? <div className="guest-section">
                    <h4>Guest Boards</h4>
                    <div className="boards">
                        {this.getBoardBtns(guestBoards)}
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