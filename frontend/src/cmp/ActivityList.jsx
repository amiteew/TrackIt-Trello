import React from 'react'
import { ActivityPreview } from './ActivityPreview'
export function ActivityList({ activities }) {
    return (
        <div>
            {activities.map(activity => <ActivityPreview activity={activity}
                key={activity._id} />)}
        </div>
    )
}
