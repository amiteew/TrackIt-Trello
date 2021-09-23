import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, } from '../store/board.actions.js';
import { boardService } from '../services/board.service.js';
import { GroupList } from '../cmp/ListsList.jsx';

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

        onRemoveBoard = (boardId) => {
            this.props.removeBoard(boardId)
        }
        onAddBoard = () => {
            this.props.addBoard()
        }
        render() {
            const { board } = this.state;
            if (!board) return <> </>
            return (
                <main>
                    <section className="board-app">
                        <GroupList groups={board.lists} onAddBoard={this.onAddBoard} onRemoveBoard={this.onRemoveBoard} />
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
    loadBoards
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)