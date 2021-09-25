import React from 'react';
import { connect } from 'react-redux';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../store/board.actions.js';
import { utilService } from '../services/util.service';
import { ProgressBar } from './ProgressBar'
class _ChecklistApp extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        checklistIdx: null
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx, checklistIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx, checklistIdx })
    }

    onAddChecklist = (ev) => {
        ev.preventDefault();
        const { currListIdx, currCardIdx, title, board } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists.push({
            checklistId: utilService.makeId(),
            title,
            tasks: []
        })
        const action = `Added Checklist`
        const txt = title
        this.props.updateBoard({ ...this.state.board }, action, currCard, txt)
        this.props.handleClose()
    }

    onDeleteChecklist = () => {
        const { currListIdx, currCardIdx, board, checklistIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const txt = currCard.checklists[checklistIdx].title
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists.splice(checklistIdx, 1)
        const action = `Deleted Checklist`
        this.props.updateBoard(boardToUpdate, action, currCard, txt)
    }


    render() {
        const { board, currListIdx, currCardIdx, checklistIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null || checklistIdx === null) return <></>
        const currChecklist = board.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx]
        return (
            <div className="checklist-app">
                <CheckBoxOutlinedIcon /> <h3>{currChecklist.title}</h3>
                <button onClick={this.onDeleteChecklist}>Delete</button>
                <ProgressBar currChecklist={currChecklist} />
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const ChecklistApp = connect(mapStateToProps, mapDispatchToProps)(_ChecklistApp)