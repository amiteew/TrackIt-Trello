import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export function MembersListBoard({ members }) {
    return (
        <>
            <AvatarGroup max={5} spacing={3}>
                {members.map(member => <Avatar alt={member.username} src={member.imgUrl} key={member._id} />)}
            </AvatarGroup>
        </>
    )
}
