import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd';

export function CardList({ cards, list, onUpdateBoard, board, currListIdx }) {
    if (!cards) return <> </>
    return (
        <section className="cards-list">
            <Droppable droppableId="cards-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((card, idx) => (
                            <CardPreview key={card.cardId} board={board} currListIdx={currListIdx} list={list} currCardIdx={idx} card={card} onUpdateBoard={onUpdateBoard} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section>
    )
}