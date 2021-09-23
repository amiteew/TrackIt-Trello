import React from 'react';
import { BasicPopOver } from './BasicPopOver'
export function AddToCard() {
    return (
        <ul className="clean-list">
            <li>Members</li>
            <li><BasicPopOver /></li>
            <li>Labels</li>
            <li>Checklist</li>
            <li>Dates</li>
            <li>Attachment</li>
            <li>Cover</li>
        </ul>
    )
}