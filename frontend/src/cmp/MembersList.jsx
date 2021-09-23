import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
export function MembersList({ members }) {
    return (
        <div>
            {/* <h3>Members</h3> */}
            <AvatarGroup max={4}>
                {members.map(member => <Avatar alt={member.username} src={member.imgUrl}
                    key={member._id} />)}
            </AvatarGroup>
        </div>
    )
}
