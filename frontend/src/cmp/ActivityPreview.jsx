import React from 'react';
import Avatar from '@mui/material/Avatar';
export class ActivityPreview extends React.Component {

    render() {
        const { activity } = this.props
        return (
            <div className="card-preview-title">
                <Avatar alt={activity.byMember.fullname} src={activity.byMember.imgUrl}
                    key={activity.byMember._id} />
                <h4>{activity.byMember.fullname}</h4>
                {(activity.type === 'userAction') && <p>{activity.txt}</p>}
                <small> {new Date(activity.createdAt).toString().substring(0, 16)}</small>
                {(activity.type !== 'userAction') && <p>{activity.txt}</p>}
            </div>

        )
    }
}