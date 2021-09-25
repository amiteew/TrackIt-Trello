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
        if (!this.props.loggedInUser) {
            this.props.history.push('/')
        }

        const { boardId } = this.props.match.params
        this.props.loadBoards();
        boardService.getBoardById(boardId)
            .then((board) => {
                this.setState({ board })
            })
    }

    onUpdateBoard = (action, card, txt) => {
        const newBoard = { ...this.state.board };
        this.props.updateBoard(newBoard, action, card, txt);
        this.props.loadBoards()
    }

    onDragEnd = (res) => {
        const { destination, source, draggableId } = res;
        const {board} = this.state;
        console.log('res', res);
        if (!destination) return;
        const dndStart = source.droppableId;
        const dndEnd = destination.droppableId;
        const dndStartIdx = source.index;
        const dndEndIdx = destination.index;
        if (dndStart === dndEnd && dndEndIdx === dndStartIdx) return;
        const list = board.lists.find(list => list.listId === dndStart)
        // const card = board.lists.cards.find(card => card.cardId === dndStart)
        console.log('list dnd', list);


    }

    render() {
        const { board } = this.state;
        if (!board) return <> </>
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <section className="board-app">
                    <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                    <BoardList board={board} lists={board.lists} onUpdateBoard={this.onUpdateBoard} />
                    <AddList board={board} onUpdateBoard={this.onUpdateBoard} />
                </section>
            </DragDropContext>
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