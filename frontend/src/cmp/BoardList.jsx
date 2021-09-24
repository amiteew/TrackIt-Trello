import { ListPreview } from './ListPreview.jsx';
import { Droppable } from 'react-beautiful-dnd';

export function BoardList({ lists, onUpdateBoard, board }) {

    return (
        <Droppable droppableId="list flex">
            {provided => (
                <div className="list flex" {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, idx) => (
                        <ListPreview key={list.listId} board={board} list={list} currListIdx={idx} onUpdateBoard={onUpdateBoard} />))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}