import React from 'react';
import Checkbox from '@mui/material/Checkbox';

export class DueDatePreview extends React.Component {

    onToggleDone = () => {
        this.props.onToggleDone()
    }

    render() {
        const { dueDate } = this.props
        return (
            <div>
                <h3>Due Date</h3>
                <Checkbox checked={dueDate.isDone}
                    onChange={this.onToggleDone}
                />
                <p>{new Date(dueDate.date).toString().substring(0, 16)}</p>
                {dueDate.isDone && <div className='done'>COMPLETE</div>}

                {/* NEED TO ADD OVERDUE */}

            </div>

        )
    }
}