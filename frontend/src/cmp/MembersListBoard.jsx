import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
export function MembersListBoard({ members }) {
    return (
        <div>
            <AvatarGroup max={4}>
                {members.map(member => <Avatar alt={member.username} src={member.imgUrl} style={{ height: '1.75rem', width: '1.75rem' }}
                    key={member._id} />)}
            </AvatarGroup>
        </div>
    )
}
