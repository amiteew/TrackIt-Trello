import React from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service.js';
import { loadBoards, removeBoard, addBoard, updateBoard, loadListAndCard } from '../store/board.actions.js';
import { Loading } from '../cmp/Loading';
import { AddToCard } from '../cmp/AddToCard';
import { MembersList } from '../cmp/MembersList'
import { CardLabelsList } from '../cmp/CardLabelsList';
import { CardActivities } from '../cmp/CardDetails/CardActivities'
import { DueDatePreview } from '../cmp/DueDatePreview';
import { CardTitle } from '../cmp/CardTitle';
import { CardDescription } from '../cmp/CardDescription.jsx';
import { ChecklistListApp } from '../cmp/ChecklistListApp';
import { DynamicPopover } from '../cmp/DynamicPopover'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardDetailsHeader } from '../cmp/CardDetailsHeader.jsx';

class _CardDetails extends React.Component {
    state = {
        // board: null,
        currListIdx: null,
        currCardIdx: null,
    }

    componentDidMount() {
        const { board } = this.props;
        console.log('board', board)
        // this.setState({ board })
        this.getCurrCard(board)
    }

    getCurrCard = (board) => {
        const listId = this.props.match.params.listId; // IN THE FUTURE FROM PARAMS
        const cardId = this.props.match.params.cardId
        const currListIdx = board.lists.findIndex(list => list.listId === listId)
        const currCardIdx = board.lists[currListIdx].cards.findIndex(card => card.cardId === cardId)
        this.setState({ ...this.state, currListIdx, currCardIdx })
    }

    // handleChange = ({ target }) => {
    //     console.log('target', target.value)
    //     const { currListIdx, currCardIdx } = this.state
    //     const boardToUpdate = { ...this.state.board }
    //     boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
    //     // CAN BE DIFFERNET FUNCTION:
    //     var currCard = boardToUpdate.lists[currListIdx].cards[currCardIdx];
    //     var action = `changed ${target.name}`
    //     var txt = target.value
    //     this.setState({ ...this.state, board: boardToUpdate }, () => {
    //         this.props.updateBoard({ ...this.state.board }, action, currCard, txt)
    //     })
    // }

    onToggleDone = () => {
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = this.props.board
        boardToUpdate.lists[currListIdx].cards[currCardIdx].dueDate.isDone =
            !boardToUpdate.lists[currListIdx].cards[currCardIdx].dueDate.isDone
        const action = 'changed Due Date'
        this.props.updateBoard(boardToUpdate, action) // need to add card

    }

    OnUpdateBoard = (board, action, currCard, txt) => {
        this.props.updateBoard(board, action, currCard, txt)
    }

    handleClose = () => {
        const { board } = this.props;
        this.props.history.push(`/boards/${board._id}`)
    }

    render() {
        const { currListIdx, currCardIdx } = this.state
        const { board } = this.props
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (<div >
            <div className="screen-card-details"></div>
            <div className="card-details" >
                <CardDetailsHeader board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                    OnUpdateBoard={this.OnUpdateBoard} />

                <div className="card-details-content">
                    <div className="card-details-main">
                        <div className="card-details-items flex direction-row items-flex-start wrap">

                            {
                                currCard.cardMembers.length ? <div>
                                    <h3>Members</h3>
                                    <MembersList members={currCard.cardMembers} board={board}
                                        currListIdx={currListIdx} currCardIdx={currCardIdx}
                                        isCardOpen={true} />
                                </div> : ''
                            }

                            {
                                currCard.cardLabelIds.length ?
                                    <div className="flex direction-row">
                                        <CardLabelsList cardLabelIds={currCard.cardLabelIds} boardLabels={board.labels}
                                            board={board}
                                            currListIdx={currListIdx}
                                            currCardIdx={currCardIdx}
                                        />
                                    </div>
                                    : ''
                            }

                            {
                                currCard.dueDate.date &&
                                <DueDatePreview dueDate={currCard.dueDate} onToggleDone={this.onToggleDone} />
                            }
                        </div>
                    </div>
                </div >
            </div>
        </div>)
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        currCard: state.boardReducer.currCard
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
    loadListAndCard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)