import React from 'react'
import { connect } from 'react-redux'
import { BoardPreview } from '../cmp/BoardPreview'

class _UserBoards extends React.Component {
    componentDidMount() {
        if (!this.props.loggedInUser) {
            this.props.history.push('/')
        }
    }

    hasStarredBoards = () => {
        return this.props.loggedInUser.memberInBoards.some(board => board.isStarred)
    }

    render() {
        const { loggedInUser } = this.props
        return (
            <section className="boards-page">
                <div className="side-nav"></div>
                {this.hasStarredBoards() && <section className="starred-boards">
                    <h1>Starred</h1>
                    {loggedInUser.memberInBoards.map(boardInfo =>
                        {if (boardInfo.isStarred) return <BoardPreview key={boardInfo.boardId} boardInfo={boardInfo} />}
                    )}
                </section>}
                <section className="boards">
                    <h1>Your boards</h1>
                    {loggedInUser.memberInBoards.map(boardInfo =>
                        <BoardPreview key={boardInfo.boardId} boardInfo={boardInfo} />
                    )}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const UserBoards = connect(mapStateToProps)(_UserBoards)
