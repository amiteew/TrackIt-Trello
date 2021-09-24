import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard, } from '../store/board.actions.js';
import { boardService } from '../services/board.service.js';
import { BoardList as BoardList } from '../cmp/BoardList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardHeader } from '../cmp/BoardHeader.jsx';
import { AddList } from '../cmp/AddList.jsx';

class _BoardApp extends React.Component {
    state = {
        board: null
    }

    componentDidMount() {
        this.props.loadBoards();
        boardService.getBoardById('b101')
            .then((board) => {
                this.setState({ board })
            })
    }

    onUpdateBoard = (action, card, txt) => {
        const  newBoard  = {...this.state.board};
        this.props.updateBoard(newBoard, action, card, txt);
    }

    render() {
        const { board } = this.state;
        if (!board) return <> </>
        return (
            <main>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <section className="board-app">
                        <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                        <BoardList board={board} lists={board.lists} onUpdateBoard={this.onUpdateBoard} />
                        <AddList board={board} onUpdateBoard={this.onUpdateBoard} />
                    </section>
                </DragDropContext>
            </main>
        )

    }

}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    removeBoard,
    addBoard,
    loadBoards,
    updateBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)