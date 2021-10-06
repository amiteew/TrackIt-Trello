
export function ArchiveItems({ board }) {
    const cards = board.lists.forEach(list => {list.cards.filter(card => !card.isArchive)})
    console.log('cards', cards);
    return (
        <div>
            {/* {!cards.isArchive.map((card) => (
                <p>{card.cardTitle}</p>
                // <QuickCardEditor list={list} card={card} currListIdx={currListIdx} currCardIdx={currCardIdx} onEditMode={this.onEditMode} isDragging={snapshot.isDragging} />
            ))} */}
        </div>
    )
}