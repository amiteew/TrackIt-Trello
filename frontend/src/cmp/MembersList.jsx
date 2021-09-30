import React from 'react'
import AvatarGroup from '@mui/material/AvatarGroup';
import { DynamicPopover } from './DynamicPopover';
import { SingleMemberPopover } from './DynamicPopover/SingleMemberPopover'
// import Avatar from '@mui/material/Avatar';
// import AddIcon from '@mui/icons-material/Add';

export function MembersList({ members, board, currListIdx, currCardIdx, isCardOpen, currCard }) {
    return (
        <div className="members-list flex direction-row">
            <AvatarGroup max={15} className="members-group">
                {members.map(member =>
                    <SingleMemberPopover key={member._id} member={member}
                        currListIdx={currListIdx} currCardIdx={currCardIdx} currCard={currCard} />
                //         <Avatar className="card-details-avatar hover" alt={member.username}
                // src={member.imgUrl} key={member._id} />
                )}
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
