import React from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { updateBoard } from '../../store/board.actions.js';

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

    render() {
        const { board, currListIdx, currCardIdx, startDate, setStartDate } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        // const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
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

export const DatesPopover = connect(mapStateToProps, mapDispatchToProps)(_DatesPopover)
