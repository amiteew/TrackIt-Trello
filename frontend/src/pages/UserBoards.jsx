import React from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/board.actions.js';
import { BoardPreview } from '../cmp/UserBoards/BoardPreview'
import { Loading } from '../cmp/Loading.jsx';

class _UserBoards extends React.Component {
    state = {
        userBoards: [],
        templateBoards: []
    }

    async componentDidMount() {
        const { boards, loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
            return
        }
        if (!boards.length) await this.props.loadBoards(loggedInUser._id);
        this.setUserAndTemplateBoards()
        // this.setState({ boards: this.props.boards })
    }

    setUserAndTemplateBoards = () => {
        const templateBoards = this.props.boards.filter(board => !board.createdBy)
        const userBoards = this.props.boards.filter(board => board.createdBy)
        // console.log('templateBoards', templateBoards);
        // console.log('userBoards', userBoards);
        this.setState({ userBoards, templateBoards })
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
        ev.stopPropagation() 
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
        const { userBoards, templateBoards } = this.state
        const { loggedInUser } = this.props
        if (!templateBoards.length) return <Loading />
        const starredBoards = this.getStarredBoards()
        return (
            <section className="boards-page">
                <div className="side-nav"></div>
                {starredBoards.length ?
                    <section className="starred-boards">
                        <h1>Starred</h1>
                        {starredBoards.map(board => {
                            const boardInfo = this.getBasicBoardInfo(board)
                            boardInfo.isStarred = true
                            // {
                            //     boardId: board._id,
                            //     boardTitle: board.boardTitle,
                            //     createdBy: board.createdBy,
                            //     isStarred: true
                            // }
                            return <BoardPreview key={board._id} boardInfo={boardInfo} loggedInUser={this.props.loggedInUser} toggleStarBoard={this.toggleStarBoard} />
                        })}
                    </section> : <></>}
                <section className="user-boards">
                    <h1>Your boards</h1>
                    {userBoards.map(board => {
                        const boardInfo = this.getBasicBoardInfo(board)
                        boardInfo.isStarred = !board.boardMembers.length ? false :
                            board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                        //     {
                        //         boardId: board._id,
                        //             boardTitle: board.boardTitle,
                        //              createdBy: board.createdBy,
                        //              isStarred: !board.boardMembers.length ? false :
                        //             board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                        //     }
                        return <BoardPreview key={board._id} boardInfo={boardInfo} loggedInUser={this.props.loggedInUser} toggleStarBoard={this.toggleStarBoard} />
                    })}
                </section>
                <section className="template-boards">
                    <h1>Templates</h1>
                    {templateBoards.map(board => {
                        const boardInfo = this.getBasicBoardInfo(board)
                        boardInfo.isStarred = false
                        // {
                        //     boardId: board._id,
                        //     boardTitle: board.boardTitle,
                        //     createdBy: board.createdBy,
                        //     isStarred: false
                        // }
                        return <BoardPreview key={board._id} boardInfo={boardInfo} loggedInUser={this.props.loggedInUser} toggleStarBoard={this.toggleStarBoard} />
                    })}
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
