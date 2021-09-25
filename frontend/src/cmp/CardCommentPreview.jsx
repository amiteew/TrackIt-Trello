export function CardCommentPreview({ cardComments }) {
    function countComments() {
        const countComment = cardComments.reduce((acc, comment) => {
            acc++
            return acc;
        }, 0)
        return countComment
    }
    return (
        <div>
            <i className="far fa-comment"></i>
            <p>{countComments()}</p>
        </div>
    )


}