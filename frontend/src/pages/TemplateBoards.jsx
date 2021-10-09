import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { loadBoards, loadBoard } from '../store/board.actions.js';
import { BoardPreview } from '../cmp/UserBoards/BoardPreview'
import { Loading } from '../cmp/Loading.jsx';
import { SideNav } from '../cmp/UserBoards/SideNav.jsx';

class _TemplateBoards extends React.Component {
    state = {
        templateBoards: []
    }

    async componentDidMount() {       
        let user = this.props.loggedInUser
        if (!user) user = await this.props.loginAsGuest()
        await this.props.loadBoards(user._id)
        const templateBoards = this.getTemplateBoards()
        this.setState({ templateBoards })
        this.props.loadBoard(null)
    }

    getTemplateBoards = () => {
        return this.props.boards.filter(board => !board.createdBy)
    }

    render() {
        const path = this.props.match.path.slice(1)
        const { templateBoards } = this.state
        if (!this.props.loggedInUser || !templateBoards.length) return <Loading />
        return (
            <section className="main-container boards">
                <section className="boards-page flex">
                    <SideNav path={path} />
                    <section className="boards-section">
                        <section className="template-boards">
                            <h3>Templates</h3>
                            <div className="boards-preview">
                                {templateBoards.map(board => {
                                    board.isStarred = false
                                    return <BoardPreview key={board._id} board={board} />
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
    loadBoard
}

export const TemplateBoards = connect(mapStateToProps, mapDispatchToProps)(_TemplateBoards)
