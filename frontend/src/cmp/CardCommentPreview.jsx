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
        <span className="badge-icon">
            <FaRegComment />
            <p className="card-txt">{countComments()}</p>
        </span>
    )


}