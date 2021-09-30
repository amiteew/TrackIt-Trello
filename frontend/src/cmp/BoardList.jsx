import { Droppable } from 'react-beautiful-dnd';
import { ListPreview } from './ListPreview.jsx';

export function BoardList({ lists, onUpdateBoard, board }) {
    return (
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
                <div className="all-lists flex" {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, index) => (
                        <ListPreview key={list.listId} board={board} list={list} currListIdx={index} onUpdateBoard={onUpdateBoard} />))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}