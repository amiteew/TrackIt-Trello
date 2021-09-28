export function LabelPreview({ labelId, boardLabels }) {
    const currLabel = boardLabels.find(label => label.id === labelId)
    return (
        <div className={`${currLabel.color} label pointer`}>
            {currLabel.title}
        </div>
    )
}