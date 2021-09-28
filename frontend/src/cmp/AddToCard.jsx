import React from 'react';
import { DynamicPopover } from './DynamicPopover';

export function AddToCard({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    const currCard = board.lists[currListIdx].cards[currCardIdx]
    return (
        <div className="add-to-card">
            <h4>ADD TO CARD</h4>
            <div className="btn-container">
                <DynamicPopover type={'members'} title={'Members'} titleModal={'Members'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'labels'} title={'Labels'} titleModal={'Labels'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />

                <DynamicPopover type={'checklist'} title={'Checklist'} titleModal={'Add checklist'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'dates'} title={'Dates'} titleModal={'Dates'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
               {!currCard.cardStyle.id && <DynamicPopover type={'cover'} title={'Cover'} titleModal={'Cover'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />}

            </div>
        </div>
    )
}