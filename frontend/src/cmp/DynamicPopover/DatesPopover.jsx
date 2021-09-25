import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateAdapter from '@mui/lab/AdapterDateFns';
// import isWeekend from 'date-fns/isWeekend';
// import isWeekend from '@date-io/date-fns/isWeekend';

class _DatesPopover extends React.Component {
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
        if (this.isLabelOnCard(currCard, label.id)) {
            const labelIdx = currCard.cardLabelIds.findIndex(cardLabelId => cardLabelId === label.id)
            newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.splice(labelIdx, 1)
            var action = `Removed label ${label.title} from `
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.push(label.id)
            var action = `Added label ${label.title} to `
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
                <h3>Dates</h3>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                {/* <LocalizationProvider >
                    <StaticDatePicker
                        orientation="landscape"
                        openTo="day"
                        value={new Date()}
                        shouldDisableDate={isWeekend}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                {/* /> */}

                {/* 
                {board.labels.length && board.labels.map(label => (
                    <div onClick={() => this.toggleLabel(label)} >
                        <div className={label.color}>
                            {label.title}
                            {this.isLabelOnCard(currCard, label.id) && <DoneIcon />}
                        </div>
                    </div> */}
                {/* ))} */}
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

export const DatesPopover = connect(mapStateToProps, mapDispatchToProps)(_DatesPopover)
