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
            <i className="far fa-comment card-icon"></i>
            <p className="card-txt">{countComments()}</p>
        </span>
    )


}