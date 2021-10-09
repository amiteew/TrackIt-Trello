import React from 'react';
import Avatar from '@mui/material/Avatar';

export class CommentPreview extends React.Component {

    render() {
        const { comment } = this.props
        return (
            <div className="card-details-comment flex direction-row">
                <Avatar className="card-details-avatar" alt={comment.byMember.fullname} src={comment.byMember.imgUrl}
                    key={comment.byMember._id} />
                <div className="comment-content">
                    <div className="flex direction-row">
                        <h4>{comment.byMember.fullname}</h4>
                        <small> {new Date(comment.createdAt).toString().substring(0, 16)}</small>
                    </div>
                    <div className="comment-txt">
                        <p>{comment.txt}</p>
                    </div>
                </div>
            </div>
        )
    }
}