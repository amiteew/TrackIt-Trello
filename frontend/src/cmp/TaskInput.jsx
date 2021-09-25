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
    }
    onDiscardChanges = () => {
        this.setState({ newTaskTxt: this.props.task.txt, isEdit: false })
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
        const task = this.props.task
        if (!newTaskTxt) return <></>
        return (<>
            {!isEdit && <div onClick={this.onToggleEdit}>{task.txt}</div>}
            {isEdit &&
                <div>
                    <TextareaAutosize
                        type='text'
                        value={newTaskTxt}
                        onChange={this.handleChange}
                        onBlur={this.onDiscardChanges}
                    />
                    <button onClick={this.onSaveTask}>Save</button>
                    <button onClick={this.onDiscardChanges}>X</button>
                </div>
            }
        </>)
    }
}