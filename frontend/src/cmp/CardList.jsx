import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd';

export function CardList({ cards, list, onUpdateBoard, board, currListIdx }) {
    if (!cards) return <> </>
    return (
        <Droppable droppableId={list.listId} type="card">
            {(provided, snapshot) => (
                <section className="all-cards" ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((card, index) => (
                            <CardPreview key={card.cardId} board={board} currListIdx={currListIdx} list={list} currCardIdx={index} card={card} onUpdateBoard={onUpdateBoard} />
                        ))}
                    {provided.placeholder}
                </section>
            )}
        </Droppable>
    )
}