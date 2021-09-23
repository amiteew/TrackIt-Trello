import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards, onRemoveBoard }) {
    return (
        <section className="cards-list">
            {cards.map(card => (
                <CardPreview key={card.id} card={card} onRemoveBoard={onRemoveBoard} />
            ))}
        </section>
    )
}