import React from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service.js';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../store/board.actions.js';
import { DebounceInput } from 'react-debounce-input';
import { Loading } from '../cmp/Loading';
import { AddToCard } from '../cmp/AddToCard';
import { MembersList } from '../cmp/MembersList'
import { CardLabelsList } from '../cmp/CardLabelsList';
import { CardActivities } from '../cmp/CardActivities'
import { DueDatePreview } from '../cmp/DueDatePreview';
class _CardDetails extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null
    }

    componentDidMount() {
        // this.props.loadBoards()
        const boardId = 'b101'; // IN THE FUTURE FROM PARAMS
        boardService.getBoardById(boardId)
            .then((board) => {
                // console.log('board from service', board);
                this.setState({ board })
            })
            .then(() => this.getCurrCard())
    }

    getCurrCard = () => {
        const listId = 'g101'; // IN THE FUTURE FROM PARAMS
        const cardId = this.props.match.params.cardId
        // console.log('cardId', cardId)
        const currBoard = this.state.board
        // console.log('currBoard', currBoard)
        const currListIdx = currBoard.lists.findIndex(list => list.listId === listId)
        const currCardIdx = currBoard.lists[currListIdx].cards.findIndex(card => card.cardId === cardId)
        // console.log('currListIdx', currListIdx);
        // console.log('currCardIdx', currCardIdx);
        this.setState({ ...this.state, currListIdx, currCardIdx })
    }

    handleChange = ({ target }) => {
        console.log('target', target.value)
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
        this.setState({ ...this.state, board: boardToUpdate }, () => {
            this.props.updateBoard({ ...this.state.board })
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

    onRemoveCar = (carId) => {
        // this.props.onRemoveCar(carId)
    }
    onAddCar = () => {
        // this.props.onAddCar()
    }
    onEditCar = (car) => {
        // const price = +prompt('New price?')
        // const carToSave = { ...car, price }
        // this.props.onEditCar(carToSave)
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        console.log('currCard', currCard)
        return (
            <div className="card-details" >
                <DebounceInput // לבחליף לטקסט אריע
                    minLength={0}
                    debounceTimeout={450}
                    name='cardTitle'
                    type='text'
                    placeholder='Enter title'
                    onChange={this.handleChange}
                    value={currCard.cardTitle}
                />

                {
                    currCard.cardMembers && <div>
                        <h3>Members</h3>
                        <MembersList members={currCard.cardMembers} />
                    </div>
                }


                {currCard.cardLabelIds && <CardLabelsList cardLabelIds={currCard.cardLabelIds} boardLabels={board.labels} />}

                {currCard.dueDate && <DueDatePreview dueDate={currCard.dueDate} onToggleDone={this.onToggleDone} />}

                <h3>Description</h3>
                <DebounceInput
                    minLength={0}
                    debounceTimeout={450}
                    name='description'
                    type='text'
                    placeholder='Add a more detailed description...'
                    onChange={this.handleChange}
                    value={currCard.description}
                />
                <CardActivities cardActivities={currCard.activities} />

                <div className="add-to-card">
                    <AddToCard />
                </div>

            </div >
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