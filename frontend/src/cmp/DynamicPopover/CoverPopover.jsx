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
        currCardIdx: null,
        isCoverSelected: 'selected'
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    onToggleCover = async (cover) => {
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        console.log('card style', cover);
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
        console.log('board', newBoard);
    }

    isCoverOnCard = (currCard, coverId) => {
        return (currCard.cardStyle.id === coverId)
    }

    handelSize = (currCard, isCover) => {
        const { board } = this.props
        const { isCoverSelected } = this.state;
        currCard.cardStyle.isCover = isCover;
       this.setState({...this.state, isCoverSelected: 'selected'})
        this.props.updateBoard(board);
    }


    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const isCoverSelected = !currCard.cardStyle.isCover || !currCard.cardStyle.id ? '' : 'selected'

        return (
            <section className="popover-cover">
                <h4>Size</h4>
                <div className="header-cover">
                    <div onClick={() => { this.handelSize(currCard, false) }} className={"header-half-cover " + isCoverSelected}>
                        <div className="paragraph"></div>
                        <div className="row"></div>
                        <div className="row second"></div>
                    </div>
                    <div onClick={() => { this.handelSize(currCard, true) }} className={"header-full-cover " + isCoverSelected}>
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