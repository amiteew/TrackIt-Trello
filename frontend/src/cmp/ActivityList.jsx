import React from 'react'
import { ActivityPreview } from './ActivityPreview'
export function ActivityList({ activities }) {
    return (
        <div>
            {activities.length && activities.map(activity => <ActivityPreview activity={activity}
                key={activity.activityId} />)}
        </div>
    )
}
