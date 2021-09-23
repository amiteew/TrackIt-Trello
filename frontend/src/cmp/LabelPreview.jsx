import { bgcolor } from "@mui/system";

export function LabelPreview({ labelId, boardLabels }) {

    const currLabelIdx = boardLabels.find(label => label.id === labelId)
    console.log('currLabelIdx', currLabelIdx);
    return (
        <div>
            <p>{currLabelIdx.title}</p>
        </div>
    )
}