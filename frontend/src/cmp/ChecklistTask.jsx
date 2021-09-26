import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TaskInput } from './TaskInput';
export function ChecklistTask({ task, taskIdx, onDeleteTask, onEditTask }) {

    return (
        <React.Fragment>
            <div>
                <Checkbox checked={task.isDone}
                    onChange={() => onEditTask(taskIdx, !task.isDone, task.txt)} />
                <TaskInput task={task} taskIdx={taskIdx} onEditTask={onEditTask} />
                <DeleteOutlineIcon onClick={() => onDeleteTask(taskIdx)} />
            </div>
        </React.Fragment >
    )
}