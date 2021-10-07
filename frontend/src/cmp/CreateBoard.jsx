import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { addBoard, loadBoard } from '../store/board.actions';
import CloseIcon from '../assets/imgs/icons/close-icon-white.svg';
import CheckedIcon from '../assets/imgs/icons/checked-icon-white.svg';

class _CreateBoard extends React.Component {
    state = {
        title: '',
        backgrounds: [
            {
                small: "https://images.unsplash.com/photo-1632813101579-7e7d4dd2c69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjQ5NjV8MHwxfGFsbHx8fHx8fHx8fDE2MzMzMzQzNDg&ixlib=rb-1.2.1&q=80&w=400",
                full: "https://images.unsplash.com/photo-1632813101579-7e7d4dd2c69a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            },
            {
                small: "https://images.unsplash.com/photo-1632714394526-1e87d08d56c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjQ5NjV8MHwxfGFsbHx8fHx8fHx8fDE2MzMzMzQzODg&ixlib=rb-1.2.1&q=80&w=400",
                full: "https://images.unsplash.com/photo-1632714394526-1e87d08d56c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            },
            {
                small: "https://images.unsplash.com/photo-1632829754530-d94a588e2dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjQ5NjV8MHwxfGFsbHx8fHx8fHx8fDE2MzMzMzQ0MTk&ixlib=rb-1.2.1&q=80&w=400",
                full: "https://images.unsplash.com/photo-1632829754530-d94a588e2dde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            },
            {
                small: "https://images.unsplash.com/photo-1632918425510-c02e76616549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjQ5NjV8MHwxfGFsbHx8fHx8fHx8fDE2MzMzMzQ0NDI&ixlib=rb-1.2.1&q=80&w=400",
                full: "https://images.unsplash.com/photo-1632918425510-c02e76616549?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1527&q=80"
            },
            "linear-gradient(225deg, rgb(255, 60, 172) 0%, rgb(120, 75, 160) 50%, rgb(43, 134, 197) 100%)",
            "#0079bf", "#d29034", "#519839", "#b04632"
        ],
        selectedBgIdx: 0
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ title: value })
    }

    createBoard = async (ev) => {
        ev.preventDefault()
        const { title, backgrounds, selectedBgIdx } = this.state
        if (!title) return
        const { loggedInUser } = this.props
        const boardMember = { ...loggedInUser }
        boardMember.isStarred = false

        const newBoard = {
            "boardTitle": title,
            "createdAt": Date.now(),
            "createdBy": loggedInUser,
            "cardsCount": 0,
            "boardStyle": backgrounds[selectedBgIdx],
            "covers": this.getCovers(),
            "labels": this.getLabels(),
            "boardMembers": [boardMember],
            "lists": [],
            "activities": [],
            "archive": []
        }

        await this.props.addBoard(newBoard)
        const { board, onToggleCreateBoard } = this.props
        onToggleCreateBoard()
        this.props.history.push(`/boards/${board._id}`)
    }

    getLabels = () => {
        let labels = []
        for (let id = 1; id <= 6; id++) {
            const label = {
                "id": utilService.makeId(),
                "title": "",
                "color": `clr${id}`
            }
            labels.push(label)
        }
        return labels
    }

    getCovers = () => {
        let covers = []
        for (let id = 1; id <= 10; id++) {
            const label = {
                "id": utilService.makeId(),
                "color": `clr${id}`
            }
            covers.push(label)
        }
        return covers
    }

    selectBg = (selectedBgIdx) => {
        this.setState({ selectedBgIdx })
    }

    render() {
        const { title, backgrounds, selectedBgIdx } = this.state
        const selectedBg = backgrounds[selectedBgIdx]
        const selectedBgStyle = utilService.getFormattedBgStyle(selectedBg)
        return (
            <div className="create-board-wrapper">
                <div className="screen" onClick={this.props.onToggleCreateBoard}></div>
                <div className="create-board flex direction-col align-center">
                    <div className="board-preview flex">
                        <div className="title-section" style={selectedBgStyle}>
                            {(selectedBgIdx < 4) && <span className="bg-overlay"></span>}
                            <button className="close-btn" onClick={this.props.onToggleCreateBoard}>
                                <img src={CloseIcon} alt="Close" />
                            </button>
                            <form onSubmit={this.createBoard}>
                                <input type="text"
                                    autoComplete="off"
                                    className="title-input"
                                    name="title"
                                    placeholder="Add board title"
                                    value={title}
                                    onChange={this.handleChange}
                                />
                            </form>
                            {<p className="user-title">{this.props.loggedInUser.fullname}'s Workspace</p>}
                        </div>
                        <div className="choose-bg flex wrap space-between">
                            {backgrounds.map((background, idx) => {
                                const bgStyle = utilService.getFormattedBgStyle(background, 'small')
                                return <div key={utilService.makeId()} className="bg-color" style={bgStyle} onClick={() => this.selectBg(idx)}>
                                    {(idx === selectedBgIdx) && <span className="selected">
                                        <img src={CheckedIcon} alt="selected" />
                                    </span>}
                                </div>
                            })}
                        </div>
                    </div>
                    <button className={`create-btn${!title ? " disabled" : ""}`} onClick={this.createBoard}>Create board</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    addBoard,
    loadBoard
}

const _CreateBoardWithRouter = withRouter(_CreateBoard);
export const CreateBoard = connect(mapStateToProps, mapDispatchToProps)(_CreateBoardWithRouter)