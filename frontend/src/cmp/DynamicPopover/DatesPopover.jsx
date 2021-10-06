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
        const date = (currCard.dueDate && currCard.dueDate.date) ? currCard.dueDate.date : Date.now()
        console.log('date', date)
        this.setState({ date })
    }

    handleDateSelect = (date) => {
        const stringDate = date.toString()
        const day = stringDate.substring(8, 10)
        const month = stringDate.substring(4, 7)
        const year = stringDate.substring(11, 15)
        const hourGmt = stringDate.substring(17, 28)
        const timestamp = `${day} ${month} ${year} ${hourGmt}`
        this.setState({ ...this.state, date: Date.parse(timestamp) })
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
                    onSelect={this.handleDateSelect}
                    startDate={Date.now()}
                    // startDate={new Date()}
                    // dateFormat="Pp"
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
