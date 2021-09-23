import React from 'react'
import { connect } from 'react-redux'

class _BoardApp extends React.Component {
    state = {
    }
    componentDidMount() {
        this.props.loadBaords()
    }

    onRemoveCar = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddCar = () => {
        this.props.onAddBoard()
    }
    render() {
        return (
           <main>
               
           </main>
        )

    }

}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBaords,
    onRemoveBoard,
    onAddBoard,
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)