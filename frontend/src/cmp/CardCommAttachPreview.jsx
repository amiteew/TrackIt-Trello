import { FaRegComment } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";

export function CardCommAttachPreview({ type, cardCommAttach }) {
    function countCommAttach() {
        const countComAttach = cardCommAttach.reduce((acc, commAttach) => {
            acc++
            return acc;
        }, 0)
        return countComAttach
    }
    return (
        <div className="badge flex align-center">
            <span className="badge-icon flex align-center">
                {type === 'comment' && <FaRegComment />}
                {type === 'attachment' && < ImAttachment />}
            </span>
            <span className="card-txt">{countCommAttach()}</span>
        </div>
    )


}