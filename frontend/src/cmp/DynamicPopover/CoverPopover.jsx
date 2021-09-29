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
            <section className="popover-cover">
                <h4>Size</h4>
                <div className="header-cover">
                    <div className="header-half-cover">
                        <div className="paragraph"></div>
                        <div className="row"></div>
                        <div className="row second"></div>
                    </div>
                    <div className="header-full-cover">
                        <div className="row full"></div>
                        <div className="row second full"></div>
                    </div>
                </div>
                <h4>Colors</h4>
                <div className="color-plate">
                    {board.covers.length && board.covers.map(cover => (
                        <div key={cover.id} onClick={() => this.onToggleCover(cover)}
                            className={`color-sqr pointer ${cover.color} 
                             ${this.isCoverOnCard(currCard, cover.id) ? 'color-selected' : ''} `}>
                        </div>
                    ))}
                </div>
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