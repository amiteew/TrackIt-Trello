import React from 'react';

import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
<<<<<<< HEAD
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
// import { DatePicker } from '@mui/lab'
// import StaticDatePicker from '@mui/lab/StaticDatePicker';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

// import MomentUtils from '@date-io/moment';

// import MomentUtils from '@date-io/moment';
// import DateAdapter from '@mui/lab/AdapterDateFns';
// import isWeekend from 'date-fns/isWeekend';
// import isWeekend from '@date-io/date-fns/isWeekend';
=======
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
>>>>>>> 19508876f5f439ac6d5c749f0310313c20e6d944

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

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
