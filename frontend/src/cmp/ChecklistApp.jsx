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
        isAddItem: false,
        currChecklist: null,
        title: null
    }

    componentDidMount() {
        const { currCard, checklistIdx } = this.props
        const currChecklist = currCard.checklists[checklistIdx]
        const title = currChecklist.title
        this.setState({ ...this.state, currChecklist, title })
    }

    onDeleteChecklist = () => {
        const { title } = this.state
        const { board, currCard, checklistIdx } = this.props
        currCard.checklists.splice(checklistIdx, 1)
        const action = `Deleted Checklist ${title}`
        this.props.updateBoard(board, action, currCard)
    }

    onDeleteTask = (taskIdx) => {
        const { currChecklist, title } = this.state
        const { board, currCard } = this.props
        currChecklist.tasks.splice(taskIdx, 1)
        const action = `Deleted item on Checklist "${title}" `
        this.props.updateBoard(board, action, currCard)
    }


    onEditTask = (taskIdx, updateIsDone, newTaskTxt) => {
        const { currChecklist, title } = this.state
        const { board, currCard } = this.props
        currChecklist.tasks[taskIdx].isDone = updateIsDone
        currChecklist.tasks[taskIdx].txt = newTaskTxt
        const action = `Updated "${newTaskTxt}" on Checklist "${title}" `
        this.props.updateBoard(board, action, currCard)
    }

    onAddTask = (txt) => {
        const { currChecklist, title } = this.state
        const { board, currCard } = this.props
        currChecklist.tasks.push(
            { id: utilService.makeId(), txt: txt, isDone: false }
        )
        const action = `Added item "${txt}" on Checklist "${title}" `
        this.props.updateBoard(board, action, currCard)
    }

    onIsAddItem = () => {
        this.setState({ ...this.state, isAddItem: !this.state.isAddItem })
    }

    render() {
        const { isAddItem, currChecklist } = this.state
        const { board, checklistIdx } = this.props
        if (!board || checklistIdx === null) return <></>
        if (!currChecklist) return <></>
        return (
            <div className="checklist-app">
                <div className="flex direction-row space-between ">
                    <div className="flex direction-row">
                        <CheckBoxOutlinedIcon className="card-details-icon" />
                        <h3 className="card-subtitle">{currChecklist.title}</h3>
                    </div>
                    <button className="delete-checklist hover" onClick={this.onDeleteChecklist}>Delete</button>
                </div>
                <ProgressBar currChecklist={currChecklist} />
                {
                    currChecklist.tasks.length ? currChecklist.tasks.map((task, taskIdx) =>
                    (<ChecklistTask key={task.id} task={task} taskIdx={taskIdx}
                        onEditTask={this.onEditTask} onDeleteTask={this.onDeleteTask} />))
                        : <></>
                }
                {!isAddItem && <button className="add-item hover" onClick={this.onIsAddItem}>Add an item</button>}
                {isAddItem && <AddNewTask onIsAddItem={this.onIsAddItem} onAddTask={this.onAddTask} />}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const ChecklistApp = connect(mapStateToProps, mapDispatchToProps)(_ChecklistApp)