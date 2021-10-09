import React from 'react'
import { ActivityPreview } from '../ActivityPreview'

export function ActivityList({ activities, currCard }) {
    if (!activities) return <></>
    activities = activities.filter(activity => activity.card.cardId === currCard.cardId)
    return (
        <div>
            {activities.length ? activities.map(activity => <ActivityPreview activity={activity}
                key={activity.id} />) : <></>}
        </div>
    )
}
