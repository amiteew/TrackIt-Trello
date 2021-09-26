import React from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/board.actions.js';
import { BoardPreview } from '../cmp/BoardPreview'
import { Loading } from '../cmp/Loading.jsx';

class _UserBoards extends React.Component {
    state = {
        boards: []
    }

    async componentDidMount() {
        const { boards, loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
            return
        }
        if (!boards.length) await this.props.loadBoards(loggedInUser._id);
        this.setState({ boards: this.props.boards })
    }

    getStarredBoards = () => {
        const { loggedInUser } = this.props
        return this.props.boards.filter(board => {
            if (!board.boardMembers.length) return false
            return board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
        })
    }

    render() {
        const { boards } = this.state
        const { loggedInUser } = this.props
        if (!boards.length) return <Loading />
        const starredBoards = this.getStarredBoards()
        return (
            <section className="boards-page">
                <div className="side-nav"></div>
                {starredBoards.length &&
                    <section className="starred-boards">
                        <h1>Starred</h1>
                        {starredBoards.map(board => {
                            const boardInfo = {
                                boardId: board._id,
                                boardTitle: board.boardTitle,
                                isStarred: true
                            }
                            return <BoardPreview key={board._id} boardInfo={boardInfo} />
                        })}
                    </section>}
                <section className="boards">
                    <h1>Your boards</h1>
                    {boards.map(board => {
                        const boardInfo = {
                            boardId: board._id,
                            boardTitle: board.boardTitle,
                            isStarred: !board.boardMembers.length ? false :
                                board.boardMembers.find(member => member._id === loggedInUser._id).isStarred
                        }
                        return <BoardPreview key={board._id} boardInfo={boardInfo} />
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
