import React from 'react';
import { DynamicPopover } from './DynamicPopover';

export function AddToCard({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    return (
        <ul className="clean-list">
            <DynamicPopover type={'members'} title={'Members'} titleModal={'Members'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
                OnUpdateBoard={OnUpdateBoard}
            />
            
            <li>Labels</li>
            <li>Checklist</li>
            <li>Dates</li>
            <li>Attachment</li>
            <li>Cover</li>
        </ul>
    )
}