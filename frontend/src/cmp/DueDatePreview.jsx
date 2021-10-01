import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export class DueDatePreview extends React.Component {
    onToggleDone = () => {
        this.props.onToggleDone()
    }

    render() {
        const { dueDate } = this.props
        return (
            <div className="due-date-preview">
                <h3>Due Date</h3>
                <div className="date-display flex direction-row">
                    <Checkbox checked={dueDate.isDone}
                        onChange={this.onToggleDone}
                    />
                    <button className="hover flex direction-row align-center">
                        <div className="date">{new Date(dueDate.date).toString().substring(0, 16)}</div>
                        {dueDate.isDone && <div className='status done'>COMPLETE</div>}
                        <KeyboardArrowDownIcon />
                    </button>
                </div>

                {/* NEED TO ADD OVERDUE */}

            </div>
        )
    }
}