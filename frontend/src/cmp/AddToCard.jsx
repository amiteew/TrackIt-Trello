import React from 'react';
import { BasicPopover } from './Members';
export function AddToCard() {
    return (
        <ul className="clean-list">
            <li>Members</li>
            {/* <li><BasicPopover /></li> */}
            <li>Labels</li>
            <li>Checklist</li>
            <li>Dates</li>
            <li>Attachment</li>
            <li>Cover</li>
        </ul>
    )
}