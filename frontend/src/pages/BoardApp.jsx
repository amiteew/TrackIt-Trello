import React from 'react';
import { connect } from 'react-redux';
import { loadBoard, removeBoard, updateBoard, } from '../store/board.actions.js';
// import { boardService } from '../services/board.service.js';
import { BoardList } from '../cmp/BoardList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardHeader } from '../cmp/BoardHeader.jsx';
import { AddList } from '../cmp/AddList.jsx';
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';
import { Route, Link } from 'react-router-dom';
import { CardDetails } from '../pages/CardDetails.jsx';
import { Loading } from '../cmp/Loading.jsx';

class _BoardApp extends React.Component {
    state = {
        board: null,
        isMenuOpen: false
    }

    async componentDidMount() {
        const { loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
        }

        const { boardId } = this.props.match.params
        await this.props.loadBoard(boardId);
        this.setState({ board: this.props.board })
        // boardService.getBoardById(boardId)
        //     .then((board) => {
        //         this.setState({ board })
        //     })
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
    }

    onDragEnd = (res) => {
        const { destination, source, draggableId, type } = res;
        const { board } = this.state;
        console.log('res', res);
        if (!destination) return;
        const dndStart = source.droppableId;
        const dndEnd = destination.droppableId;
        const dndStartIdx = source.index;
        const dndEndIdx = destination.index;
        if (dndStart === dndEnd && dndEndIdx === dndStartIdx) return;

        if (type === 'list') {
            const list = board.lists.splice(dndStartIdx, 1)
            board.lists.splice(dndEndIdx, 0, ...list)
            this.onUpdateBoard();
            return
        }
        if (dndStart === dndEnd) {
            const list = board.lists.find(list => list.listId === dndStart)
            const card = list.cards.splice(dndStartIdx, 1);
            list.cards.splice(dndEndIdx, 0, ...card);
        }
        if (dndStart !== dndEnd) {
            const listStart = board.lists.find(list => list.listId === dndStart)
            const card = listStart.cards.splice(dndStartIdx, 1);
            const listEnd = board.lists.find(list => list.listId === dndEnd)
            listEnd.cards.splice(dndEndIdx, 0, ...card);
        }

        this.onUpdateBoard();
        // const card = board.lists.cards.find(card => card.cardId === dndStart)
    }

    // onPopOver = (position, name, props) => {
    //     <DynamicPopover type={'labels'} title={'Labels'} titleModal={'Labels'}
    //         board={board}
    //         currListIdx={currListIdx}
    //         currCardIdx={currCardIdx}
    //     />
    // }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    render() {
        const { board, isMenuOpen } = this.state;
        if (!board) return <Loading />
        return (
            <section className="board-app flex direction-col">
                <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                <Route exact component={CardDetails} path="/boards/:boardId/:listId/:cardId" />
                <div className="board-canvas flex">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <BoardList board={board} lists={board.lists} onUpdateBoard={this.onUpdateBoard} className="board" />
                    </DragDropContext >
                    <AddList board={board} onUpdateBoard={this.onUpdateBoard} />
                    {!isMenuOpen && <h1 onClick={this.toggleMenu}> Show menu</h1>}
                    {isMenuOpen && <TemporaryDrawer toggleMenu={this.toggleMenu} board={board} />}
                </div>
            </section >
        )

    }

}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    removeBoard,
    loadBoard,
    updateBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)