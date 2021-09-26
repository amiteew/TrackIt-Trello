import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import { color } from '@mui/system';
class _CoverPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    onToggleCover = async (cover) => {
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        const currCard = newBoard.lists[currListIdx].cards[currCardIdx]
        if (this.isCoverOnCard(currCard, cover.id)) {
            newBoard.lists[currListIdx].cards[currCardIdx].cardStyle = {}
            var action = `Removed Cover from `
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardStyle = {
                id: cover.id,
                color: cover.color,
                isCover: false
            }
            var action = `Added Cover to `
        }
        await this.props.updateBoard(newBoard, action, currCard)
    }

    isCoverOnCard = (currCard, coverId) => {
        return (currCard.cardStyle.id === coverId)
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <section className="cover-popover">
                <h3>Colors</h3>
                {board.covers.length && board.covers.map(cover => (
                    <div >
                        <div className="color-plate">
                            <div onClick={() => this.onToggleCover(cover)}
                                className={`color-sqr ${cover.color} 
                             ${this.isCoverOnCard(currCard, cover.id) ? 'color-selected' : ''} `}>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
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
    updateBoard
}

export const CoverPopover = connect(mapStateToProps, mapDispatchToProps)(_CoverPopover)