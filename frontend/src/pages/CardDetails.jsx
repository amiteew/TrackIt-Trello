import React from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service.js'
import { loadBoards, removeBoard, addBoard, } from '../store/board.actions.js'

class _CardDetails extends React.Component {
    state = {
        board: null
    }

    componentDidMount() {
        // IN THE FUTURE FROM PARAMS:
        const boardId = 'b101';

        boardService.getBoardById(boardId)
            .then((board) => {
                console.log('board from service', board);
                this.setState({ board })
            })
    }

    getCurrCard = () => {
        // IN THE FUTURE FROM PARAMS:
        const listId = 'g101';
        const cardId = this.props.match.params.cardId
        // const currCard = this.state.board.list


        // entities => entities.find(entity => entity._id === entityId)
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
        // const { cars } = this.props
        return (
            <div>
                Card Details
            </div>
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
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)