import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { loadBoards, loadBoard, removeBoard, updateBoard, toggleLabels } from '../store/board.actions.js';
import { Loading } from '../cmp/Loading.jsx';
import { BoardHeader } from '../cmp/BoardHeader.jsx';
import { BoardList } from '../cmp/BoardList.jsx';
import { AddList } from '../cmp/AddList.jsx';
import { CardDetails } from '../pages/CardDetails.jsx';

class _BoardApp extends React.Component {
    state = {
        isMenuOpen: false
    }

    async componentDidMount() {
        const { loggedInUser } = this.props
        if (!loggedInUser) {
            this.props.history.push('/')
        }
        if (!this.props.boards.length) await this.props.loadBoards()
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
        console.log('board component did mount');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('board component did update');
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
        // const newBoard = { ...this.state.board };
        const { board } = this.props
        this.props.updateBoard(board, action, card, txt);
    }

    onDragEnd = (res) => {
        // const { destination, source, draggableId, type } = res;
        const { destination, source, type } = res;
        const { board } = this.props
        if (!destination) return;
        const dndStart = source.droppableId;
        const dndEnd = destination.droppableId;
        const dndStartIdx = source.index;
        const dndEndIdx = destination.index;
        if (dndStart === dndEnd && dndEndIdx === dndStartIdx) return;

        if (type === 'list') {
            const list = board.lists.splice(dndStartIdx, 1)
            board.lists.splice(dndEndIdx, 0, ...list)
            this.props.updateBoard(board);
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
            if (!listEnd.cards) {
                listEnd.push(card);
                return;
            }

            listEnd.cards.splice(dndEndIdx, 0, ...card);
        }

        this.props.updateBoard(board);
    }

    // onPopOver = (position, name, props) => {
    //     <DynamicPopover type={'labels'} title={'Labels'} titleModal={'Labels'}
    //         board={board}
    //         currListIdx={currListIdx}
    //         currCardIdx={currCardIdx}
    //     />
    // }

    onToggleLabels = () => {
        this.props.toggleLabels()
    }

    render() {
        const { board } = this.props;
        if (!board) return <Loading />
        const bgStyle = (board.boardStyle.bgImgUrl) ?
            { backgroundImage: `url(${board.boardStyle.bgImgUrl})` } :
            { backgroundColor: board.boardStyle.bgColor }
        return (
            <section className="board-app flex direction-col">
                <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} />
                <Route exact component={CardDetails} path="/boards/:boardId/:listId/:cardId" />
                <div className="board-background" style={bgStyle}></div>
                <div className="board-canvas flex">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <BoardList board={board} lists={board.lists} onUpdateBoard={this.onUpdateBoard} className="board" />
                    </DragDropContext >
                    <AddList board={board} onUpdateBoard={this.onUpdateBoard} />
                </div>
            </section >
        )

    }

}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards,
        board: state.boardReducer.board,
        isLabelOpen: state.boardReducer.isLabelOpen,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    removeBoard,
    loadBoards,
    loadBoard,
    updateBoard,
    toggleLabels
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)