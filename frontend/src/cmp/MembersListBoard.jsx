import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { DynamicPopover } from './DynamicPopover';
export function MembersListBoard({ members }) {
    return (
        <>
            <AvatarGroup max={5} spacing={-4}>
                {members.map(member => {
                    if (member.username === 'pandaguest') return
                    return <span key={member._id} className="avatar-btn">
                        <Avatar src={member.imgUrl} key={member._id} >
                            <p>{member.initials}</p>
                        </Avatar>
                        <DynamicPopover type={'boardMember'} titleModal={''} user={member} from="BoardHeader" />
                    </span>
                })}
            </AvatarGroup>
        </>
    )
}
