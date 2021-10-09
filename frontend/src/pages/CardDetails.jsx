import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard, loadListAndCard } from '../store/board.actions.js';
import { Loading } from '../cmp/Loading';
import { CardSideBar } from '../cmp/CardDetails/CardSideBar';
import { MembersList } from '../cmp/CardDetails/MembersList'
import { CardLabelsList } from '../cmp/CardLabelsList';
import { CardActivities } from '../cmp/CardDetails/CardActivities'
import { CardTitle } from '../cmp/CardDetails/CardTitle';
import { CardDescription } from '../cmp/CardDetails/CardDescription.jsx';
import { ChecklistListApp } from '../cmp/CardDetails/ChecklistListApp';
import { CardDetailsHeader } from '../cmp/CardDetails/CardDetailsHeader.jsx';
import { CardAttachmentsList } from '../cmp/CardDetails/CardAttachmentsList';
import { DynamicPopover } from '../cmp/DynamicPopover'
import { DisplayCardArchive } from '../cmp/CardDetails/DisplayCardArchive';

class _CardDetails extends React.Component {
    state = {
        currListIdx: null,
        currCardIdx: null,
    }

    componentDidMount() {
        const { board } = this.props;
        this.getCurrCard(board)
    }

    getCurrCard = (board) => {
        const listId = this.props.match.params.listId;
        const cardId = this.props.match.params.cardId
        const currListIdx = board.lists.findIndex(list => list.listId === listId)
        const currCardIdx = board.lists[currListIdx].cards.findIndex(card => card.cardId === cardId)
        this.setState({ ...this.state, currListIdx, currCardIdx })
    }

    onToggleDone = () => {
        const { currListIdx, currCardIdx } = this.state
        const board = this.props.board
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        currCard.dueDate.isDone = !currCard.dueDate.isDone
        const action = currCard.dueDate.isDone
            ? 'Marked the due date complete'
            : 'Marked the due date incomplete'
        this.props.updateBoard(board, action, currCard)

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
        return (
            <div className="card-details-wrapper" >
                <div className="screen-card-details" onClick={this.handleClose}></div>
                <div className="card-details" >
                    <CardDetailsHeader board={board}
                        currCard={currCard}
                        currListIdx={currListIdx}
                        currCardIdx={currCardIdx}
                        handleClose={this.handleClose} />

                    {currCard.isArchived ? <DisplayCardArchive /> : <></>}

                    <div className="card-details-main-content">

                        <CardTitle
                            board={board}
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
                                                currListIdx={currListIdx}
                                                currCardIdx={currCardIdx} currCard={currCard} isCardOpen={true} />
                                        </div> : ''
                                    }

                                    {
                                        currCard.cardLabelIds.length ?
                                            <CardLabelsList cardLabelIds={currCard.cardLabelIds} boardLabels={board.labels}
                                                board={board}
                                                currListIdx={currListIdx}
                                                currCardIdx={currCardIdx} isCardOpen={true} /> : ''
                                    }

                                    {
                                        currCard.dueDate.date &&
                                        <div id="due-date-preview-card">
                                            <DynamicPopover type={'dates-edit'} title={'Dates'} titleModal={'Dates'}
                                                board={board}
                                                currListIdx={currListIdx}
                                                currCardIdx={currCardIdx}
                                                dueDate={currCard.dueDate}
                                                onToggleDone={this.onToggleDone}
                                            />
                                        </div>
                                    }
                                </div>

                                <CardDescription board={board}
                                    currListIdx={currListIdx}
                                    currCardIdx={currCardIdx}
                                    OnUpdateBoard={this.OnUpdateBoard} />

                                <CardAttachmentsList board={board}
                                    currListIdx={currListIdx}
                                    currCardIdx={currCardIdx}
                                    OnUpdateBoard={this.OnUpdateBoard} />

                                <ChecklistListApp currCard={currCard} />

                                <CardActivities board={board}
                                    currListIdx={currListIdx}
                                    currCardIdx={currCardIdx}
                                    OnUpdateBoard={this.OnUpdateBoard} />
                            </div>
                            <div className="card-details-sidebar">
                                <CardSideBar board={board}
                                    currListIdx={currListIdx}
                                    currCardIdx={currCardIdx}
                                    handleClose={this.handleClose} />
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