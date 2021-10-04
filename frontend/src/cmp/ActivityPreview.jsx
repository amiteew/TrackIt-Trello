import React from 'react';
import Avatar from '@mui/material/Avatar';
export class ActivityPreview extends React.Component {

    render() {
        const { activity, display } = this.props
        return (
            <div className="activity-preview flex direction-row">
                <Avatar className="card-details-avatar" alt={activity.byMember.fullname} src={activity.byMember.imgUrl}
                    key={activity.byMember._id} />
                <div>
                    <h4>{activity.byMember.fullname} {activity.action} {activity.txt}
                        {(display === 'menu') && activity.card.cardTitle && `on card: "${activity.card.cardTitle}"`}
                    </h4>

                    <small> {new Date(activity.createdAt).toString().substring(0, 16)}</small>
                </div>
            </div>

        )
    }
}