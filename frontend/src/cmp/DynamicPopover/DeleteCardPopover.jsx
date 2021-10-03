export function DeleteCardPopover({ onDeleteCard }) {
    return (
        <section className="delete-card-popover">
            <p>All actions will be removed from the activity <br />
                feed and you won’t be able to
                re-open the <br />
                card. There is no undo.</p>
            <button onClick={onDeleteCard}>Delete</button>
        </section>
    )
}