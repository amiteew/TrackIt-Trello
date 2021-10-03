export function DeleteCardPopover({ onDeleteCard }) {
    return (
        <section className="delete-card-popover">
            <p>All actions will be removed
                from the activity feed and you won’t be able to
                re-open the card. There is no undo.</p>
            <button onClick={onDeleteCard}>Delete</button>
        </section>
    )
}