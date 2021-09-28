import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddIcon from '@mui/icons-material/Add';
import { DynamicPopover } from './DynamicPopover';

export function MembersList({ members }) {
    return (
        <div className="members-list">
            <AvatarGroup max={15} className="members-group">
                {members.map(member => <Avatar className="card-details-avatar" alt={member.username} src={member.imgUrl}
                    key={member._id} />)}
                {/* <DynamicPopover type={'members'} title={'Members'} titleModal={'Members'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                /> */}
                {/* <AddIcon /> */}
            </AvatarGroup>
        </div>
    )
}
