import { BsCheckBox } from 'react-icons/bs';

export function CardDuDatePreview({ dueDate }) {


    return (
        <div className="badge">
           <span className="due-date"><BsCheckBox /></span>
            <span>{new Date(dueDate.date).toString().substring(3, 10)}</span>
        </div>
    )
}