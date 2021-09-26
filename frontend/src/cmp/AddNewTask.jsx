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
    handleKeyPress = (ev) => {
    }
    onAddTask = () => {
        const newTaskTxt = this.state.txt
        this.props.onAddTask(newTaskTxt)
        this.setState({ txt: '' })
    }

    render() {
        const { txt } = this.state
        return (<>
            <div>
                <TextareaAutosize
                    type='text'
                    value={txt}
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    onBlur={this.onDiscardChanges}
                />
                <button onClick={this.onAddTask}>Add</button>
                <button onClick={this.onDiscardChanges}>X</button>
            </div>
        </>)
    }
}