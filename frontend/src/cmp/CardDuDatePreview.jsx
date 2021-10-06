import React from 'react';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import { RiCheckboxBlankLine } from "react-icons/ri";
import { IoMdCheckboxOutline } from "react-icons/io";
export class CardDuDatePreview extends React.Component {


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
        const overDue = !dueDate.isDone && dueDate.date < Date.now() ? 'overdue' : '';
        return (
            <div className={`badge due-date flex align-center ${classDone} ${overDue}`} onClick={this.onToggleDone}>
                { !dueDate.isDone && <span className="check"><RiCheckboxBlankLine />
                </span>}
                { dueDate.isDone && <span className="check"> <IoMdCheckboxOutline /> </span>}
                <span className="clock"><AccessTimeSharpIcon /> </span>
                <span className="date">{new Date(dueDate.date).toString().substring(3, 10)}</span>
            </div>
        )
    }
}