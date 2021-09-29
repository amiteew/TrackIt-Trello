import React from 'react';

import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import { MuiPickersUtilsProvider, DatePicker, TimePicker, DateTimePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class _DatesPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        duDate: new Date()
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    handleDateChange = () => {
        console.log('im in DatesPopover.handleDateChange');
    }

    render() {
        const { board, currListIdx, currCardIdx, duDate } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    value={duDate}
                    // open={true}
                    onChange={this.handleDateChange} />
            </MuiPickersUtilsProvider>
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
