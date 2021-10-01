import React from 'react';
import { connect } from 'react-redux';
import { updateBoard, loadListAndCard } from '../store/board.actions.js';
import { Loading } from '../cmp/Loading';
import { AddToCard } from '../cmp/AddToCard';
import { MembersList } from '../cmp/MembersList'
import { CardLabelsList } from '../cmp/CardLabelsList';
import { CardActivities } from '../cmp/CardDetails/CardActivities'
import { DueDatePreview } from '../cmp/DueDatePreview';
import { CardTitle } from '../cmp/CardTitle';
import { CardDescription } from '../cmp/CardDescription.jsx';
import { ChecklistListApp } from '../cmp/ChecklistListApp';
import { CardDetailsHeader } from '../cmp/CardDetailsHeader.jsx';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

class _CardDetails extends React.Component {
    state = {
        // board: null,
        currListIdx: null,
        currCardIdx: null,
    }

    componentDidMount() {
        const { board } = this.props;
        // console.log('board', board)
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

    uploadImg = (ev) => {
        const CLOUD_NAME = 'looply'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        console.log('target', ev.target)
        formData.append('file', ev.target.files[0])
        console.log('ev.target.files[0]):', ev.target.files[0])
        formData.append('upload_preset', 'oxageyls');
        console.log('formData:', formData)

        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {
                const elImg = document.createElement('img');
                elImg.src = res.url;
                document.body.append(elImg);
            })
            .catch(err => console.error(err))
    }

    render() {
        const { currListIdx, currCardIdx } = this.state
        const { board } = this.props
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (<div >
            <div className="screen-card-details" onClick={this.handleClose}></div>
            <div className="card-details" >
                <CardDetailsHeader board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                    handleClose={this.handleClose} />
                <div className="card-details-main-content">

                    <CardTitle board={board}
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
                                    <DueDatePreview dueDate={currCard.dueDate} onToggleDone={this.onToggleDone} />
                                }
                            </div>

                            <label> Upload your image to cloudinary!
                                <input onChange={this.uploadImg} type="file" />
                            </label>


                            <CardDescription board={board}
                                currListIdx={currListIdx}
                                currCardIdx={currCardIdx}
                                OnUpdateBoard={this.OnUpdateBoard} />

                            <ChecklistListApp board={board}
                                currListIdx={currListIdx}
                                currCardIdx={currCardIdx}
                                OnUpdateBoard={this.OnUpdateBoard} />

                            <CardActivities board={board}
                                currListIdx={currListIdx}
                                currCardIdx={currCardIdx}
                                OnUpdateBoard={this.OnUpdateBoard} />
                        </div>
                        <div className="card-details-sidebar">
                            <AddToCard board={board}
                                currListIdx={currListIdx}
                                currCardIdx={currCardIdx} />
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
    updateBoard,
    loadListAndCard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)