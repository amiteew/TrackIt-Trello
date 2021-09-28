import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddIcon from '@mui/icons-material/Add';
import { DynamicPopover } from './DynamicPopover';

export function MembersList({ members, board, currListIdx, currCardIdx, isCardOpen }) {
    return (
        <div className="members-list flex direction-row">
            <AvatarGroup max={15} className="members-group">
                {members.map(member => <Avatar className="card-details-avatar hover" alt={member.username}
                    src={member.imgUrl} key={member._id} />)}
            </AvatarGroup>
            {isCardOpen &&
                <DynamicPopover type={'add-members'}
                    titleModal={'Members'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
            }
        </div>
    )
}
