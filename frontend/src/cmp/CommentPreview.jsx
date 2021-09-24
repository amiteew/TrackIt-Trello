import React from 'react';
import Avatar from '@mui/material/Avatar';
export class CommentPreview extends React.Component {

    render() {
        const { comment } = this.props
        return (
            <div className="card-preview-title">
                <Avatar alt={comment.byMember.fullname} src={comment.byMember.imgUrl}
                    key={comment.byMember._id} />
                <h4>{comment.byMember.fullname}</h4>
                {(comment.type === 'userAction') && <p>{comment.txt}</p>}
                <small> {new Date(comment.createdAt).toString().substring(0, 16)}</small>
                {(comment.type !== 'userAction') && <p>{comment.txt}</p>}
            </div>

        )
    }
}