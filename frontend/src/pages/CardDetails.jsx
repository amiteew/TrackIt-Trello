import React from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service.js'
import { loadBoards, removeBoard, addBoard, } from '../store/board.actions.js'

class _CardDetails extends React.Component {
    state = {
    }

    componentDidMount() {

        const boardId = 'b101';
        const listId = 'g101';
        const cardId = this.props.match.params.cardId
        boardService.getCardById(boardId, listId, cardId)


        // IN THE FUTURE FROM PARAMS:
        // const boardId = this.props.match.params.boardId
        // const boardId =
        // console.log('this.props', this.props);
        // console.log('cardId', cardId);

        // this.setState({ ...this.state, user: this.props.user })


        // toyService.getById(toyId)
        //     .then(toy => {
        //         toy.labels = toy.labels.map(label => ({ value: label, label: label }))
        //         this.setState({ toy })
        //         // console.log('toy to edit from props params: ', toy)
        //     })

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