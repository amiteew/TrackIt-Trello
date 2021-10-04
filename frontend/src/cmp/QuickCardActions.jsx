import React from 'react';
import { DynamicPopover } from './DynamicPopover';
import { BsArchive } from "react-icons/bs";

export function QuickCardActions({ board, currListIdx, currCardIdx, currCard, OnUpdateBoard, onArchive }) {

    return (
        <div className="quick-card-actions fade-in">

            <span className="quick-card-actions-btn"> <DynamicPopover type={'edit labels'} title={'Edit labels'} titleModal={'Labels'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            />
            </span>

            <span className="quick-card-actions-btn"> <DynamicPopover type={'change members'} title={'Change members'} titleModal={'Members'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            />
            </span>

            {/* <DynamicPopover type={'edit-dates'} title={'Edit dates'} titleModal={'Dates'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            /> */}

            <span className="quick-card-actions-btn"><DynamicPopover type={'change cover'} title={'Change cover'} titleModal={'Cover'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            />
            </span>

            <span className="quick-card-actions-btn"> <DynamicPopover type={'move-card'} titleModal={'Move Card'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
                currCard={currCard}
            /></span>

            <span className="quick-card-actions-btn"> <DynamicPopover type={'copy-card'} titleModal={'Copy Card'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
                currCard={currCard}
            /></span>

            <span className="quick-card-actions-btn"> <button onClick={onArchive}><BsArchive /> Archive</button></span>
        </div>
    )
}