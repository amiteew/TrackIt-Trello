import React from 'react'
import { LabelPreview } from './LabelPreview'
export function CardLabelsList({ cardLabelIds, boardLabels }) {
    return (
        <div>
            <h3>Labels</h3>
            <div className="flex wrap">
                {cardLabelIds.map(labelId => <LabelPreview key={labelId} labelId={labelId} boardLabels={boardLabels} />)}
            </div>
        </div>
    )
}
