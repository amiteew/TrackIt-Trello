import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard, } from '../store/board.actions.js';
import { boardService } from '../services/board.service.js';
import { BoardList as BoardList } from '../cmp/BoardList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardHeader } from '../cmp/BoardHeader.jsx';
import { AddList } from '../cmp/AddList.jsx';
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';
import { Route, Link } from 'react-router-dom';
import { CardDetails } from '../pages/CardDetails.jsx';

class _BoardApp extends React.Component {
    state = {
        board: null,
        isMenuOpen: false
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

    componentDidUpdate(prevProps, prevState) {
        // if (JSON.stringify(prevState.board) !== JSON.stringify(this.state.board)) {
        //     console.log('changed!!!!', prevState)
        //     const { boardId } = this.props.match.params
        //     boardService.getBoardById(boardId)
        //         .then((board) => {
        //             this.setState({ board })
        //         })
        // }
    }


    onUpdateBoard = (action, card, txt) => {
        const newBoard = { ...this.state.board };
        this.props.updateBoard(newBoard, action, card, txt);
        this.props.loadBoards()
    }

    onDragEnd = (res) => {
        const { destination, source, draggableId } = res;
        const { board } = this.state;
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

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    render() {
        const { board, isMenuOpen } = this.state;
        if (!board) return <> </>
        return (
            <section className="board-app flex direction-col">
                <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                <Route exact component={CardDetails} path="/boards/:boardId/:listId/:cardId" />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="board-canvas flex">
                        <BoardList board={board} lists={board.lists} onUpdateBoard={this.onUpdateBoard} className="board" />
                        <AddList board={board} onUpdateBoard={this.onUpdateBoard} />
                        {!isMenuOpen && <h1 onClick={this.toggleMenu}> Show menu</h1>}
                        {isMenuOpen && <TemporaryDrawer toggleMenu={this.toggleMenu} board={board} />}
                    </div>
                </DragDropContext >
            </section >
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