// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import MomentUtils from '@date-io/moment';
import React from 'react';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
// REACT DATE PICKER NOT GOOD:
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// METRIAL UI:

class _DatesPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        startDate: new Date(),
        setStartDate: new Date()
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    handleDateChange = () => {
        console.log('im in DatesPopover.handleDateChange');
    }

    handleDateSelect = (date) => {
        console.log('date', date)
    }

    render() {
        const { board, currListIdx, currCardIdx, startDate, setStartDate } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (

            // <MuiPickersUtilsProvider utils={MomentUtils}>
            //     <DatePicker
            //         autoOk
            //         variant="static"
            //         openTo="date"
            //         value={new Date()}
            // onChange={this.handleChange}

            //     />
            // </MuiPickersUtilsProvider>

            // REACT NOT GOOD:

            <DatePicker
                selected={startDate}
                // onChange={(date) => setStartDate(date)}
                onSelect={(date) => this.handleDateSelect(date)}
                inline
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
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
