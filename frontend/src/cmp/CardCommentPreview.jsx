export function CardCommentPreview({ cardComments }) {
    function countComments() {
        console.log('card', cardComments);
        const countComment = cardComments.reduce((acc, comment) => {
            acc++
            return acc;
        }, 0)
        return countComment
    }
    return (
        <div>
            <i class="far fa-comment"></i>
            <p>{countComments()}</p>
        </div>
    )


}