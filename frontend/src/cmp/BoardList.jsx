import { ListPreview } from './ListPreview.jsx';
import { Droppable } from 'react-beautiful-dnd';

export function BoardList({ lists, onUpdateBoard, board }) {

    return (
        <Droppable droppableId="list flex" type="list">
            {provided => (
                <div className="list flex" {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, index) => (
                        <ListPreview key={list.listId} board={board} list={list} currListIdx={index} onUpdateBoard={onUpdateBoard} />))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}