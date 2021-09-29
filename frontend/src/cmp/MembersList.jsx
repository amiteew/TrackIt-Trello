import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import AddIcon from '@mui/icons-material/Add';
import { DynamicPopover } from './DynamicPopover';
import { SingleMemberPopover } from './DynamicPopover/SingleMemberPopover'
export function MembersList({ members, board, currListIdx, currCardIdx, isCardOpen }) {
    return (
        <div className="members-list flex direction-row">
            <AvatarGroup max={15} className="members-group">
                {members.map(member =>
                    <div className="single-member-popover">
                        <SingleMemberPopover key={member._id} member={member}
                            currListIdx={currListIdx} currCardIdx={currCardIdx} />
                        {/* <Avatar className="card-details-avatar hover" alt={member.username}
                        src={member.imgUrl} key={member._id} /> */}
                    </div>

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
