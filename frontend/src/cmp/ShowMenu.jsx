import {ActivityPreview} from './ActivityPreview.jsx';

export function ShowMenu({ board }) {
    
    
    console.log('activities',board.activities);
   return (
       <div>
           {board.activities.length && board.activities.map(activity => <ActivityPreview activity={activity} display={'menu'} key={activity.id} />)}
       </div>
   )

}