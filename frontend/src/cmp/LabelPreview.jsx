export function LabelPreview({ labelId, boardLabels, type}) {
    const currLabel = boardLabels.find(label => label.id === labelId)
    
        return (
            <div className={`${currLabel.color} label pointer`}>
                {currLabel.title}
            </div>
        )
}