import { CardPreview } from './CardPreview.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function CardList({ cards }) {
    return (
        <section className="cards-list">
            {cards.map((card, index) => (
                <Droppable droppableId={card.cardId}>
                    {provided => (
                        <CardPreview key={card.cardId} index={index} card={card} ref={provided.innerRef} {...provided.droppableProps} {...provided.placeholder}/>
                    )}
                </Droppable>
            ))}
        </section>
    )
}