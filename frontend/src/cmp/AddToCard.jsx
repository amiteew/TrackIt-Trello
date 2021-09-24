import React from 'react';
import { DynamicPopover } from './DynamicPopover';

export function AddToCard() {
    return (
        <ul className="clean-list">
            <li>Members</li>
            <DynamicPopover type={'members'} title={'Members'} />
            <li>Labels</li>
            <li>Checklist</li>
            <li>Dates</li>
            <li>Attachment</li>
            <li>Cover</li>
        </ul>
    )
}