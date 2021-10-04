import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DatePicker from "react-datepicker";

class _DatesPopover extends React.Component {
    state = {
        date: null,
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const date = (currCard.dueDate.date) ? new Date(currCard.dueDate.date) : Date.now()
        this.setState({ date })
    }

    handleDateSelect = (date) => {
        this.setState({ ...this.state, date: new Date(date) })
    }

    onSaveDate = (date) => {
        const { board, currListIdx, currCardIdx } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        // need to fix
        if (!date) var action = 'Removed due date'
        else if (date && currCard.duedate && !currCard.duedate.date) var action = 'Set due date'
        else var action = 'Changed due date'
        currCard.dueDate = {
            date: date,
            isDone: false
        }
        this.props.updateBoard(board, action, currCard)
        this.props.handleClose()
    }

    render() {
        const { date } = this.state
        if (!date) return <></>
        return (
            <div className="dates-popover">
                <DatePicker
                    onSelect={(date) => this.handleDateSelect(date)}
                    startDate={new Date()}
                    openToDate={date}
                    inline
                    formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
                />
                <div className=" flex direction-col">
                    <button className="btn-date-save" onClick={() => this.onSaveDate(this.state.date)}>Save</button>
                    <button className="btn-date-remove" onClick={() => this.onSaveDate(null)}>Remove</button>
                </div>
            </div>
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
