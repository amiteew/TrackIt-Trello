import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export class TaskInput extends React.Component {
    state = {
        newTaskTxt: null,
        isEdit: false
    }
    componentDidMount() {
        const { task } = this.props
        this.setState({ ...this.state, newTaskTxt: task.txt })
    }
    onToggleEdit = () => {
        this.setState({ ...this.state, isEdit: !this.state.isEdit })
        this.props.onEditMode()
    }
    onDiscardChanges = () => {
        this.setState({ newTaskTxt: this.props.task.txt, isEdit: false })
        this.props.onEditMode()
    }
    handleChange = ({ target }) => {
        this.setState({ ...this.state, newTaskTxt: target.value })
    }
    onSaveTask = () => {
        const { taskIdx, task } = this.props
        this.props.onEditTask(taskIdx, task.isDone, this.state.newTaskTxt)
        this.onToggleEdit()
    }

    render() {
        const { newTaskTxt, isEdit } = this.state
        const { task } = this.props
        const classTask = (task.isDone) ? 'task-done' : ''

        if (!newTaskTxt) return <></>
        return (<div className="task-input">
            {!isEdit && <div className={classTask} onClick={this.onToggleEdit}>{task.txt}</div>}
            {isEdit &&
                <div className="task-update">
                    <TextareaAutosize
                        className="text-area-auto task-edit"
                        type='text'
                        value={newTaskTxt}
                        onChange={this.handleChange}
                    />
                    <div className="flex direction-row align-center">
                        <button className="save-task" onClick={this.onSaveTask}>Save</button>
                        <button className="discard-task" onClick={this.onDiscardChanges}>X</button>
                    </div>
                </div>
            }
        </div>)
    }
}