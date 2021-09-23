import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard, } from '../store/board.actions.js';
import { boardService } from '../services/board.service.js';
import { ListsList } from '../cmp/ListsList.jsx';
import { BoardHeader } from '../cmp/BoardHeader.jsx';

class _BoardApp extends React.Component {
    state = {
        board: null
    }

    componentDidMount() {
        this.props.loadBoards()
        boardService.getBoardById('b101')
            .then((board) => {
                this.setState({ board })
            })
    }

    onUpdateBoard = () => {
        const { board } = this.state;
        this.setState({board})
        this.props.updateBoard(board);
        this.props.loadBoards(); 
    }

    render() {
        const { board } = this.state;
        if (!board) return <> </>
        return (
            <main>
                <section className="board-app">
                    <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                    <ListsList lists={board.lists} onUpdateBoard={this.onUpdateBoard} />
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
    removeBoard,
    addBoard,
    loadBoards,
    updateBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)