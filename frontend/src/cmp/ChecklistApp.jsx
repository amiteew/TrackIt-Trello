import React from 'react';
import { connect } from 'react-redux';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../store/board.actions.js';
import { utilService } from '../services/util.service';
import { ProgressBar } from './ProgressBar'
import { ChecklistTask } from './ChecklistTask'
import { AddNewTask } from './AddNewTask';
class _ChecklistApp extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        checklistIdx: null,
        isAddItem: false
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx, checklistIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx, checklistIdx })
    }

    onDeleteChecklist = async () => {
        const { currListIdx, currCardIdx, board, checklistIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const title = currCard.checklists[checklistIdx].title
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists.splice(checklistIdx, 1)
        const action = `Deleted Checklist ${title}`
            `added List ${tilte}`
        await this.props.updateBoard(boardToUpdate, action, currCard)
    }

    onDeleteTask = async (taskIdx) => {
        const { currListIdx, currCardIdx, board, checklistIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const title = currCard.checklists[checklistIdx].title
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx].tasks.splice(taskIdx, 1)
        const action = `Deleted item on Checklist "${title}" `
        await this.props.updateBoard(boardToUpdate, action, currCard)
    }


    onEditTask = async (taskIdx, updateIsDone, newTaskTxt) => {
        const { currListIdx, currCardIdx, board, checklistIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const title = currCard.checklists[checklistIdx].title
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx].tasks[taskIdx].isDone = updateIsDone
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx].tasks[taskIdx].txt = newTaskTxt
        const action = `Updated "${newTaskTxt}" on Checklist "${title}" `
        await this.props.updateBoard(boardToUpdate, action, currCard)
    }

    onAddTask = async (txt) => {
        const { currListIdx, currCardIdx, board, checklistIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const title = currCard.checklists[checklistIdx].title
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx].tasks.push(
            { id: utilService.makeId(), txt: txt, isDone: false }
        )
        const action = `Added item "${txt}" on Checklist "${title}" `
        await this.props.updateBoard(boardToUpdate, action, currCard)
    }

    onIsAddItem = () => {
        this.setState({ ...this.state, isAddItem: !this.state.isAddItem })
    }

    render() {
        const { board, currListIdx, currCardIdx, checklistIdx, isAddItem } = this.state
        if (!board || currCardIdx === null || currListIdx === null || checklistIdx === null) return <></>
        const currChecklist = board.lists[currListIdx].cards[currCardIdx].checklists[checklistIdx]
        if (!currChecklist) return <></>
        return (
            <div className="checklist-app">
                <CheckBoxOutlinedIcon /> <h3>{currChecklist.title}</h3>
                <button onClick={this.onDeleteChecklist}>Delete</button>
                <ProgressBar currChecklist={currChecklist} />
                {
                    currChecklist.tasks.length && currChecklist.tasks.map((task, taskIdx) =>
                    (<ChecklistTask key={task.id} task={task} taskIdx={taskIdx}
                        onEditTask={this.onEditTask} onDeleteTask={this.onDeleteTask} />))
                }
                {!isAddItem && <button onClick={this.onIsAddItem}>Add an item</button>}
                {isAddItem && <AddNewTask onIsAddItem={this.onIsAddItem} onAddTask={this.onAddTask} />}
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