import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd';

export function CardList({ cards, list, onUpdateBoard, board }) {
    if (!cards) return <> </>
    return (
        <section className="cards-list">
            <Droppable droppableId={list.listId}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((card, idx) => (
                            <CardPreview key={card.cardId} board={board} list={list} currCardIdx={idx} card={card} onUpdateBoard={onUpdateBoard} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    )
}