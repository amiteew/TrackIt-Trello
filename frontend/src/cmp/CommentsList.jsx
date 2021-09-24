import React from 'react'
import { CommentPreview } from './CommentPreview'
export function CommentsList({ comments }) {
    if (!comments) return <React.Fragment></React.Fragment>
    return (
        <div>
            {comments.length && comments.map(comment => <CommentPreview comment={comment}
                key={comment.id} />)}
        </div>
    )
}
