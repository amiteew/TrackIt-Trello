import React from 'react'
import AvatarGroup from '@mui/material/AvatarGroup';
import { DynamicPopover } from '../DynamicPopover';
import { SingleMemberPopover } from '../DynamicPopover/SingleMemberPopover'

export function MembersList({ members, board, currListIdx, currCardIdx, isCardOpen, currCard }) {
    return (
        <div className="members-list flex direction-row">
            <AvatarGroup max={15} className="members-group">
                {members.map(member => {
                    if (member.username === 'pandaguest') return
                    return <SingleMemberPopover key={member._id} member={member}
                        currListIdx={currListIdx} currCardIdx={currCardIdx} currCard={currCard} />
                }
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
