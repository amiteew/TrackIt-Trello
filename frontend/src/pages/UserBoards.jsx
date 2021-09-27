import React from 'react'
import { connect } from 'react-redux'

import { loadBoards, updateBoard } from '../store/board.actions.js';

import { BoardPreview } from '../cmp/UserBoards/BoardPreview'
import { Loading } from '../cmp/Loading';
import { SideNav } from '../cmp/UserBoards/SideNav';

import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';

class _UserBoards extends React.Component {
    state = {
        userBoards: null
    }

    async componentDidMount() {
        const { boards, loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
            return
        }
        if (!boards.length) await this.props.loadBoards(loggedInUser._id);
        const userBoards = this.removeTemplateBoards(this.props.boards)
        this.setState({ userBoards })
    }

    removeTemplateBoards = (boards) => {
        return boards.filter(board => board.createdBy)
    }

    getStarredBoards = () => {
        const { loggedInUser } = this.props
        return this.state.userBoards.filter(board => {
            if (!board.boardMembers.length) return false
            return board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
        })
    }

    toggleStarBoard = (ev, board) => {
        ev.preventDefault()
        const { loggedInUser } = this.props
        const boardMembersIdx = board.boardMembers.findIndex(member => member._id === loggedInUser._id)
        board.boardMembers[boardMembersIdx].isStarred = !board.boardMembers[boardMembersIdx].isStarred
        this.props.updateBoard(board)
    }

    render() {
        const path = this.props.match.path.slice(1)
        const { userBoards } = this.state
        const { loggedInUser } = this.props
        if (!userBoards) return <Loading />
        const starredBoards = this.getStarredBoards()
        return (
            <section className="main-container boards">
                <section className="boards-page flex">
                    <SideNav path={path} />
                    <section className="boards-section">
                        {starredBoards.length ?
                            <section className="starred-boards">
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
                        <section className="user-boards">
                            <h3>All Boards</h3>
                            <div className="boards-preview">
                                {userBoards.map(board => {
                                    board.isStarred = board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                                    return <BoardPreview key={board._id} board={board} loggedInUser={loggedInUser} toggleStarBoard={this.toggleStarBoard} isLarge={board.isStarred} />
                                })}
                            </div>
                        </section>
                    </section>
                </section>
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
    loadBoards,
    updateBoard
}

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards)
