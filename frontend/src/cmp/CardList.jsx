import { CardPreview } from './CardPreview.jsx'

export function CardList({ cards }) {
    return (
        <section className="cards-list">
            {cards.map(card => (
                <CardPreview key={card.cardId} card={card} />
            ))}
        </section>
    )
}