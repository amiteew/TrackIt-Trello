import React from 'react';
import { connect } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { BsPencil } from "react-icons/bs";
import { updateBoard } from '../../store/board.actions.js';
// import Avatar from '@mui/material/Avatar';

class _LabelsPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    toggleLabel = (label) => {
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        const currCard = newBoard.lists[currListIdx].cards[currCardIdx]
        let action = ''

        if (this.isLabelOnCard(currCard, label.id)) {
            const labelIdx = currCard.cardLabelIds.findIndex(cardLabelId => cardLabelId === label.id)
            newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.splice(labelIdx, 1)
            action = `Removed label "${label.title}" from `
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.push(label.id)
            action = `Added label "${label.title}"  to `
        }
        
        this.props.updateBoard(newBoard, action, currCard)
    }

    isLabelOnCard = (currCard, labelId) => {
        return (currCard.cardLabelIds.some(cardLabelId => cardLabelId === labelId))
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <section className="label-popover">
                <TextareaAutosize
                    className="search-labels text-area-auto"
                    placeholder="Search labels..."
                    type='text'
                // value={txt}
                // onChange={this.handleChange}
                // onKeyPress={this.handleChange}
                // onBlur={this.onDiscardChanges}
                // autoFocus
                />
                <h4>Labels</h4>
                {board.labels.length && board.labels.map(label => (
                    <div key={label.id} className="edit-label-popover flex" onClick={() => this.toggleLabel(label)} >
                        <div className={'edit-label-color ' + label.color}>
                            {label.title}
                            {this.isLabelOnCard(currCard, label.id) && <DoneIcon />}
                        </div>
                        <div className="edit-label-icon">
                            <BsPencil />
                        </div>
                    </div>
                ))}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const LabelsPopover = connect(mapStateToProps, mapDispatchToProps)(_LabelsPopover)