import React from 'react'
import { connect } from 'react-redux'
import {loadBoards, removeBoard,addBoard,} from '../store/board.actions.js'

class _BoardApp extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    onRemoveCar = (boardId) => {
        this.props.removeBoard(boardId)
    }
    onAddCar = () => {
        this.props.addBoard()
    }
    render() {
        const { boards } = this.props;
        console.log('boards', boards);
        return (
            <main>
                <section className="board-app">
                    <h1>hello</h1>
                    <h2>{boards.boardTitle}</h2>
                </section>
            </main>
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


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)