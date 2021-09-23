import React from 'react'
import { LabelPreview } from './LabelPreview'
export function CardLabelsList({ cardLabelIds, boardLabels }) {
    return (
        <React.Fragment>
            {cardLabelIds.map(labelId => <LabelPreview key={labelId} labelId={labelId} boardLabels={boardLabels} />)}
        </React.Fragment>
    )
}
