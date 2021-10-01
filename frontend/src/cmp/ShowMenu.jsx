import { ActivityPreview } from './ActivityPreview.jsx';

export function ShowMenu({ board }) {
    return (
        <div className="menu-content">
            {board.activities.length && board.activities.map(activity => <ActivityPreview activity={activity} display={'menu'} key={activity.id} />)}
        </div>
    )
}

