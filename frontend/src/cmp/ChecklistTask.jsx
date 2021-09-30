import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TaskInput } from './TaskInput';
// export function ChecklistTask({ task, taskIdx, onDeleteTask, onEditTask }) {
export class ChecklistTask extends React.Component {
    state = {
        isEdit: false
    }
    onEditMode = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }
    render() {
        const { task, taskIdx, onDeleteTask, onEditTask } = this.props
        const { isEdit } = this.state
        return (
            <div className="task-preview flex direction-row space-between">
                <div className="width-100 flex direction-row align-center">
                    <Checkbox className={`checkbox ${(isEdit) ? 'edit' : ''}`} checked={task.isDone}
                        onChange={() => onEditTask(taskIdx, !task.isDone, task.txt)} />
                    <TaskInput onEditMode={this.onEditMode} task={task} taskIdx={taskIdx} onEditTask={onEditTask} />
                </div>
                {!isEdit && <DeleteOutlineIcon className="delete-task pointer" onClick={() => onDeleteTask(taskIdx)} />}
            </div>
        )
    }
}