import React from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/board.actions.js';
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
        this.removeTemplateBoards()
        // this.setState({ boards: this.props.boards })
    }

    removeTemplateBoards = () => {
        console.log('all boards:');
        // const templateBoards = this.props.boards.filter(board => !board.createdBy)
        const userBoards = this.props.boards.filter(board => board.createdBy)
        // console.log('templateBoards', templateBoards);
        // console.log('userBoards', userBoards);
        this.setState({ userBoards })
    }

    getStarredBoards = () => {
        const { loggedInUser } = this.props
        return this.state.userBoards.filter(board => {
            if (!board.boardMembers.length) return false
            return board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
        })
        // return this.props.boards.filter(board => {
        //     if (!board.boardMembers.length) return false
        //     return board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
        // })
    }

    toggleStarBoard = (ev) => {
        // ev.preventDefault()
        // ev.stopPropagation()
        console.log('toggle star');
    }

    getBasicBoardInfo = (board) => {
        return {
            boardId: board._id,
            boardTitle: board.boardTitle,
            createdBy: board.createdBy,
            boardStyle: board.boardStyle
        }
    }

    render() {
        const { userBoards } = this.state
        const { loggedInUser } = this.props
        if (!userBoards) return <Loading />
        const starredBoards = this.getStarredBoards()
        return (
            <section className="main-container boards">
                <section className="boards-page flex">
                    <SideNav />
                    <section className="boards">
                        {starredBoards.length ?
                            <section className="starred-boards">
                                <div className="star-title flex">
                                    <IconContext.Provider value={{ className: "star-icon" }} >
                                        <FiStar />
                                    </IconContext.Provider>
                                    <h3>Starred boards</h3>
                                </div>
                                <div className="boards-preview">
                                    {starredBoards.map(board => {
                                        const boardInfo = this.getBasicBoardInfo(board)
                                        boardInfo.isStarred = true
                                        return <BoardPreview key={board._id} boardInfo={boardInfo} loggedInUser={this.props.loggedInUser} toggleStarBoard={this.toggleStarBoard} isYellow={true} />
                                    })}
                                </div>
                            </section> : <></>}
                        <section className="user-boards">
                            <h3>All boards</h3>
                            <div className="boards-preview">
                                {userBoards.map(board => {
                                    const boardInfo = this.getBasicBoardInfo(board)
                                    boardInfo.isStarred = !board.boardMembers.length ? false :
                                        board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                                    return <BoardPreview key={board._id} boardInfo={boardInfo} loggedInUser={this.props.loggedInUser} toggleStarBoard={this.toggleStarBoard} isLarge={boardInfo.isStarred} />
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
    loadBoards
}

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards)
