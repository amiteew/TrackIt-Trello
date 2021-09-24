import React from 'react';
import Avatar from '@mui/material/Avatar';
export class ActivityPreview extends React.Component {

    render() {
        const { activity } = this.props
        return (
            <div className="activity-preview">
                <Avatar alt={activity.byMember.fullname} src={activity.byMember.imgUrl}
                    key={activity.byMember._id} />
                <h4>{activity.byMember.fullname} {activity.action} {activity.txt}
                    On Card: "{activity.card.cardTitle}"</h4>
                <small> {new Date(activity.createdAt).toString().substring(0, 16)}</small>
            </div>

        )
    }
}