import React from 'react'
import { connect } from 'react-redux'
// import { loadCars, onAddCar, onEditCar, onRemoveCar, addToCart } from '../store/car.actions.js'

class _CardDetails extends React.Component {
    state = {
    }
    componentDidMount() {
        const boards = this.props.loadBoards()
        console.log('boards', boards);
        // this.props.loadCars()
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
    // loadCars,
    // onRemoveCar,
    // onAddCar,
    // onEditCar,
    // addToCart
}


export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)