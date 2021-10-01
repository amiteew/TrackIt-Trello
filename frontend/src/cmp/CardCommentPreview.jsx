import { FaRegComment } from "react-icons/fa";

export function CardCommentPreview({ cardComments }) {
    function countComments() {
        const countComment = cardComments.reduce((acc, comment) => {
            acc++
            return acc;
        }, 0)
        return countComment
    }
    return (
        <div className="badge flex align-center">
            <span className="badge-icon flex align-center">
                <FaRegComment />
            </span>
            <span className="card-txt">{countComments()}</span>
        </div>
    )


}