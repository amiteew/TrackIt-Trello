import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TaskInput } from './TaskInput';
export function ChecklistTask({ task, taskIdx, onDeleteTask, onEditTask }) {

    return (
        <React.Fragment>
            <div className="task-preview flex direction-row space-between">
                <div className="flex direction-row align-center">
                    <Checkbox checked={task.isDone}
                        onChange={() => onEditTask(taskIdx, !task.isDone, task.txt)} />
                    <TaskInput task={task} taskIdx={taskIdx} onEditTask={onEditTask} />
                </div>
                <DeleteOutlineIcon className="delete-task pointer" onClick={() => onDeleteTask(taskIdx)} />
            </div>
        </React.Fragment >
    )
}