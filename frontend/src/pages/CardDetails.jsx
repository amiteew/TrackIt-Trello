import React from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service.js';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../store/board.actions.js';
import { Loading } from '../cmp/Loading';
import { AddToCard } from '../cmp/AddToCard';
import { MembersList } from '../cmp/MembersList'
import { CardLabelsList } from '../cmp/CardLabelsList';
import { CardActivities } from '../cmp/CardActivities'
import { DueDatePreview } from '../cmp/DueDatePreview';
import { CardTitle } from '../cmp/CardTitle';
import { CardDescription } from '../cmp/CardDescription.jsx';
import { ChecklistListApp } from '../cmp/ChecklistListApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


class _CardDetails extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
    }

    componentDidMount() {
        // this.props.loadBoards()   
        const boardId = this.props.match.params.boardId; // IN THE FUTURE FROM PARAMS
        boardService.getBoardById(boardId)
            .then((board) => {
                this.setState({ board })
            })
            .then(() => this.getCurrCard())
    }

    getCurrCard = () => {
        const listId = this.props.match.params.listId; // IN THE FUTURE FROM PARAMS
        const cardId = this.props.match.params.cardId
        const currBoard = this.state.board
        const currListIdx = currBoard.lists.findIndex(list => list.listId === listId)
        const currCardIdx = currBoard.lists[currListIdx].cards.findIndex(card => card.cardId === cardId)
        this.setState({ ...this.state, currListIdx, currCardIdx })
    }

    handleChange = ({ target }) => {
        console.log('target', target.value)
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
        // CAN BE DIFFERNET FUNCTION:
        var currCard = boardToUpdate.lists[currListIdx].cards[currCardIdx];
        var action = `changed ${target.name}`
        var txt = target.value
        this.setState({ ...this.state, board: boardToUpdate }, () => {
            this.props.updateBoard({ ...this.state.board }, action, currCard, txt)
        })
    }

    onToggleDone = () => {
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].dueDate.isDone =
            !boardToUpdate.lists[currListIdx].cards[currCardIdx].dueDate.isDone
        this.setState({ ...this.state, board: boardToUpdate }, () => {
            this.props.updateBoard({ ...this.state.board })
        })
    }

    OnUpdateBoard = async (board, action, currCard, txt) => {
        await this.props.updateBoard(board, action, currCard, txt)
    }

    handleClose = () => {
        const {board} = this.state;
        this.props.history.push(`/boards/${board._id}`)
    }

    render() {
        const { board, currListIdx, currCardIdx, isEditOpen } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <Modal open={true} onClose={this.handleClose}>
                <Box className="card-details">
                    <div >
                        <CardTitle board={board}
                            currListIdx={currListIdx}
                            currCardIdx={currCardIdx}
                            OnUpdateBoard={this.OnUpdateBoard} />

                        {
                            currCard.cardMembers ? <div>
                                <h3>Members</h3>
                                <MembersList members={currCard.cardMembers} /> 
                            </div> : ''
                        }

                        {
                            currCard.cardLabelIds.length ?
                                <CardLabelsList cardLabelIds={currCard.cardLabelIds} boardLabels={board.labels} /> : ''
                        }

                        {
                            currCard.dueDate.date &&
                            <DueDatePreview dueDate={currCard.dueDate} onToggleDone={this.onToggleDone} />
                        }

                        <CardDescription board={board}
                            currListIdx={currListIdx}
                            currCardIdx={currCardIdx}
                            OnUpdateBoard={this.OnUpdateBoard} />

                        <ChecklistListApp board={board}
                            currListIdx={currListIdx}
                            currCardIdx={currCardIdx}
                            OnUpdateBoard={this.OnUpdateBoard} />

                        <AddToCard board={board}
                            currListIdx={currListIdx}
                            currCardIdx={currCardIdx} />

                        <CardActivities board={board}
                            currListIdx={currListIdx}
                            currCardIdx={currCardIdx}
                            OnUpdateBoard={this.OnUpdateBoard} />

                    </div >
                </Box>
            </Modal >
        )
    }
}


function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)