import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, loadBoard, removeBoard, updateBoard, toggleLabels, setNotif } from '../store/board.actions.js';
import { loginAsGuest } from '../store/user.actions.js';
import { BoardList } from '../cmp/BoardList.jsx';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardHeader } from '../cmp/BoardHeader.jsx';
import { AddList } from '../cmp/AddList.jsx';
import { Route } from 'react-router-dom';
import { CardDetails } from '../pages/CardDetails.jsx';
import { Dashboard } from './Dashboard'
import { Loading } from '../cmp/Loading.jsx';
import { socketService } from '../services/socket.service';
import { utilService } from '../services/util.service';

class _BoardApp extends React.Component {
    state = {
        isMenuOpen: false
    }

    async componentDidMount() {
        if (!this.props.loggedInUser) {
            const user = await this.props.loginAsGuest()
            await this.props.loadBoards(user._id)
        }
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId);
        socketService.emit('boardId', boardId);
        socketService.on('board updated', board => {
            this.props.loadBoard(board._id)
        })
        socketService.on('sending notification', (isNotif) => {
            this.props.setNotif(isNotif)
        })
    }

    componentWillUnmount() {
        socketService.off('board updated', this.updateSocket);
        socketService.off('boardId');
        this.props.setNotif(false)
        socketService.off('sending notification')
    }

    componentDidUpdate(prevProps, prevState) {
        const { boardId } = this.props.match.params
        if (prevProps.board && boardId !== this.props.board._id) {
            this.props.loadBoard(boardId)
        }
    }

    onUpdateBoard = (board, action, card = '', txt = '') => {
        this.props.updateBoard(board, action, card, txt);
    }

    onDragEnd = (res) => {
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

    onOpenDashboard = () => {
        const { board } = this.props
        this.props.history.push(`/boards/${board._id}/dashboard`);
    }

    goToTemplateClone = (newBoardId) => {
        this.props.history.push(`/boards/${newBoardId}`);
    }

    render() {
        const { board } = this.props;
        if (!board || !Object.keys(board).length) return <Loading />
        const bgStyle = utilService.getFormattedBgStyle(board.boardStyle, 'full')
        return (
            <section className="board-app flex direction-col">
                <Route exact component={CardDetails} path="/boards/:boardId/:listId/:cardId" />
                <Route exact component={Dashboard} path="/boards/:boardId/dashboard" />
                <BoardHeader board={board} onUpdateBoard={this.onUpdateBoard} onOpenDashboard={this.onOpenDashboard} goToTemplateClone={this.goToTemplateClone} />
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
    toggleLabels,
    setNotif,
    loginAsGuest
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)