import { ListPreview } from './ListPreview.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function ListsList({ lists, onUpdateBoard }) {

    return (
        <DragDropContext>
            <section className="list flex">
                {lists.map(list => (
                    <ListPreview key={list.listId} list={list} onUpdateBoard={onUpdateBoard} />
                ))}
            </section>
        </DragDropContext>
    )
}