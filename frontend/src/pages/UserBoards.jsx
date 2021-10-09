import React from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/user.service.js';
import { loadBoards, loadBoard, updateBoard } from '../store/board.actions.js';
import { loginAsGuest } from '../store/user.actions.js';
import { socketService } from '../services/socket.service.js';

import { BoardPreview } from '../cmp/UserBoards/BoardPreview'
import { Loading } from '../cmp/Loading';
import { SideNav } from '../cmp/UserBoards/SideNav';

import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';
import { CreateBoard } from '../cmp/CreateBoard.jsx';

class _UserBoards extends React.Component {
    state = {
        userBoards: [],
        isCreateBoard: false
    }

    async componentDidMount() {
        let user = this.props.loggedInUser
        if (!user) user = await this.props.loginAsGuest()
        await this.props.loadBoards(user._id)
        const userBoards = userService.filterUserBoards(this.props.boards, this.props.loggedInUser._id, "all")
        this.setState({ userBoards })
        this.props.loadBoard(null)
    }


    getBoardsByType = (type) => {
        const { loggedInUser } = this.props
        return userService.filterUserBoards(this.state.userBoards, loggedInUser._id, type)
    }

    getGuestBoards = () => {

    }

    toggleStarBoard = (ev, board) => {
        ev.preventDefault()
        const { loggedInUser, updateBoard } = this.props
        const updatedBoard = userService.toggleStarBoard(board, loggedInUser._id)
        updateBoard(updatedBoard)
    }

    onToggleCreateBoard = () => {
        const { isCreateBoard } = this.state
        this.setState({ isCreateBoard: !isCreateBoard })
    }

    render() {
        const path = this.props.match.path.slice(1)
        const { userBoards } = this.state
        const { loggedInUser } = this.props
        if (!loggedInUser) return <Loading />
        const starredBoards = userBoards.length ? this.getBoardsByType("starred") : []
        const owndBoards = userBoards.length ? this.getBoardsByType("owner") : []
        const guestdBoards = userBoards.length ? this.getBoardsByType("guest") : []
        // const starredBoards = userBoards.length ? this.getStarredBoards() : []
        return (
            <section className="main-container boards">
                <section className="boards-page flex">
                    <SideNav path={path} />
                    <section className="boards-section">
                        {starredBoards.length ?
                            <section className="inner-section starred-boards">
                                <div className="star-title flex">
                                    <IconContext.Provider value={{ className: "star-icon" }} >
                                        <FiStar />
                                    </IconContext.Provider>
                                    <h3>Starred boards</h3>
                                </div>
                                <div className="boards-preview">
                                    {starredBoards.map(board =>
                                        <BoardPreview key={board._id} board={board} loggedInUser={loggedInUser} toggleStarBoard={this.toggleStarBoard} isYellow={true} />
                                    )}
                                </div>
                            </section> : <></>}
                        <section className="inner-section user-boards">
                            <h3>Your Boards</h3>
                            <div className="boards-preview">
                                {owndBoards.map(board => {
                                    board.isStarred = board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                                    return <BoardPreview key={board._id} board={board} loggedInUser={loggedInUser} toggleStarBoard={this.toggleStarBoard} isLarge={board.isStarred} />
                                })}
                                <div className="board-preview create-board flex align-center justify-center" onClick={this.onToggleCreateBoard}>Create new board</div>
                            </div>
                        </section>
                        {guestdBoards.length ? <section className="inner-section guest-boards user-boards">
                            <h3>Guest Boards</h3>
                            <div className="boards-preview">
                                {guestdBoards.map(board => {
                                    board.isStarred = board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                                    return <BoardPreview key={board._id} board={board} loggedInUser={loggedInUser} toggleStarBoard={this.toggleStarBoard} isLarge={board.isStarred} />
                                })}
                            </div>
                        </section> : <></>}
                    </section>
                </section>
                {this.state.isCreateBoard && <CreateBoard onToggleCreateBoard={this.onToggleCreateBoard} />}
            </section>
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
    loadBoard,
    loadBoards,
    updateBoard,
    loginAsGuest
}

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards)
