import React from 'react';
import { Checkbox } from '@mui/material';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';

export class CardDuDatePreview extends React.Component{


    onToggleDone = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const { card } = this.props;
        card.dueDate.isDone = !card.dueDate.isDone;
        this.props.updateBoard(this.props.board);
    }

    render() {
        const { dueDate } = this.props;
        const classDone = dueDate.isDone ? 'done' : '';
        return (
            <div className={`badge due-date flex align-center ${classDone}`}>
                <span className="check"><Checkbox
                    checked={dueDate.isDone}
                    onClick={this.onToggleDone}
                />
                </span>
                <span className="clock"><AccessTimeSharpIcon /> </span>
                <span>{new Date(dueDate.date).toString().substring(3, 10)}</span>
            </div>
        )
    }
}