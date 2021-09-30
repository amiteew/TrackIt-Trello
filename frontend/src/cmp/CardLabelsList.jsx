import React from 'react'
import { DynamicPopover } from './DynamicPopover'

export function CardLabelsList({ cardLabelIds, boardLabels, board, currCardIdx, currListIdx }) {
    return (
        <div>
            <h3>Labels</h3>
            <div className="labels-list flex wrap">
                {cardLabelIds.map(labelId =>
                    <DynamicPopover key={labelId} labelId={labelId} boardLabels={boardLabels} type={'labels-preview'} titleModal={'Labels'}
                        board={board}
                        currListIdx={currListIdx}
                        currCardIdx={currCardIdx}
                    />)}
                {/* <LabelPreview key={labelId} labelId={labelId} boardLabels={boardLabels} />)} */}

                <DynamicPopover className="add-labels" type={'add-labels'} titleModal={'Labels'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
            </div>
        </div>
    )
}
