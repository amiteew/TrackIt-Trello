import React from 'react';
import { DynamicPopover } from './DynamicPopover';

export function AddToCard({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    return (
        <ul className="clean-list">
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
            <li>Attachment</li>
            <DynamicPopover type={'cover'} title={'Cover'} titleModal={'Cover'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            />
        </ul>
    )
}