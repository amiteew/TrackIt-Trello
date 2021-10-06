import React from 'react';
import { DynamicPopover } from './DynamicPopover';
import { JoinCard } from './CardDetails/JoinCard';
import { ArchiveButtoms } from './CardDetails/ArchiveButtoms';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export function CardSideBar({ board, currListIdx, currCardIdx, OnUpdateBoard, handleClose }) {
    const currCard = board.lists[currListIdx].cards[currCardIdx]
    return (
        <div className="add-to-card">

            <JoinCard board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx} />

            <h4>ADD TO CARD</h4>
            <div className="btn-container">

                <DynamicPopover type={'members'} title={'Members'} titleModal={'Members'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'labels'} title={'Labels'} titleModal={'Labels'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />

                <DynamicPopover type={'checklist'} title={'Checklist'} titleModal={'Add checklist'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />
                <DynamicPopover type={'dates'} title={'Dates'} titleModal={'Dates'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />

                <DynamicPopover type={'attachments'} title={'attachments'} titleModal={'Attachments'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />

                {!currCard.cardStyle.id && <DynamicPopover type={'cover'} title={'Cover'} titleModal={'Cover'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                />}


                <h4>ACTIONS</h4>

                <DynamicPopover type={'move-card'} titleModal={'Move Card'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                    currCard={currCard}
                />

                <DynamicPopover type={'copy-card'} titleModal={'Copy Card'}
                    board={board}
                    currListIdx={currListIdx}
                    currCardIdx={currCardIdx}
                    currCard={currCard}
                />

                <ArchiveButtoms currCard={currCard}
                    currListIdx={currListIdx} currCardIdx={currCardIdx}
                    handleClose={handleClose}
                />
            </div>
        </div>
    )
}