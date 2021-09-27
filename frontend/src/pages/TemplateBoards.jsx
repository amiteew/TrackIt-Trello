import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { loadBoards } from '../store/board.actions.js';
import { BoardPreview } from '../cmp/UserBoards/BoardPreview'
import { Loading } from '../cmp/Loading.jsx';
import { SideNav } from '../cmp/UserBoards/SideNav.jsx';

class _TemplateBoards extends React.Component {
    state = {
        templateBoards: []
    }

    async componentDidMount() {
        const { boards, loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
            return
        }
        if (!boards.length) await this.props.loadBoards(loggedInUser._id);
        this.getTemplateBoards()
        // this.setState({ boards: this.props.boards })
    }

    getTemplateBoards = () => {
        const templateBoards = this.props.boards.filter(board => !board.createdBy)
        // const userBoards = this.props.boards.filter(board => board.createdBy)
        // console.log('templateBoards', templateBoards);
        // console.log('userBoards', userBoards);
        this.setState({ templateBoards })
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
        const { templateBoards } = this.state
        if (!templateBoards.length) return <Loading />
        return (
            <section className="main-container">
                <section className="boards-page flex">
                    <SideNav />
                    <section className="boards">
                        <section className="template-boards">
                            <h3>Templates</h3>
                            <div className="boards-preview">
                                {templateBoards.map(board => {
                                    const boardInfo = this.getBasicBoardInfo(board)
                                    boardInfo.isStarred = false
                                    return <BoardPreview key={board._id} boardInfo={boardInfo} />
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

export const TemplateBoards = connect(mapStateToProps, mapDispatchToProps)(_TemplateBoards)
