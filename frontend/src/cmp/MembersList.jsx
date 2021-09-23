import React from 'react'
// import { ToyPreview } from './ToyPreview.jsx'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
export function MembersList({ cardMembers }) {
    return (
        <div>
            <h3>Members</h3>
            <AvatarGroup max={4}>
                {cardMembers.map(member => <Avatar alt={member.username} src={member.imgUrl}
                    key={member._id} />)}
            </AvatarGroup>
        </div>
    )
}
