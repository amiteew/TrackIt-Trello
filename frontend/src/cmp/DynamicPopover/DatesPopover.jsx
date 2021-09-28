import React from 'react';

import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
