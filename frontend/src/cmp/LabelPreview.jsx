import { bgcolor } from "@mui/system";

export function LabelPreview({ labelId, boardLabels }) {

    const currLabel = boardLabels.find(label => label.id === labelId)
    

    return (
        <div className={currLabel.color}>
            <p>{currLabel.title}</p>
        </div>
    )
}