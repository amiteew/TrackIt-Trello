import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export class AddNewTask extends React.Component {
    state = {
        txt: ''
    }
    onDiscardChanges = () => {
        this.setState({ txt: '' })
        this.props.onIsAddItem()
    }
    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            this.onAddTask()
        }
        else this.setState({ txt: ev.target.value })
    }
    onAddTask = () => {
        const newTaskTxt = this.state.txt
        if (!newTaskTxt) return
        this.props.onAddTask(newTaskTxt)
        this.setState({ txt: '' })
    }

    render() {
        const { txt } = this.state
        return (
            <div className="add-new-task">
                <TextareaAutosize
                    type='text'
                    className="text-area-auto task-edit"
                    value={txt}
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    autoFocus
                />
                <div>
                    <button className="save-task" onClick={this.onAddTask}>Add</button>
                    <button className="discard-task" onClick={this.onDiscardChanges}>X</button>
                </div>
            </div>
        )
    }
}