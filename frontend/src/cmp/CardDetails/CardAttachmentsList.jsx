import React from 'react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { AttachmentPreview } from './AttachmentPreview'
import { DynamicPopover } from '../DynamicPopover';
export function CardAttachmentsList({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    const cardAttachments = board.lists[currListIdx].cards[currCardIdx].attachments

    const onDeleteAttach = (attachmentId) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        const attachIdx = cardAttachments.findIndex(attachment => attachment.id === attachmentId)
        cardAttachments.splice(attachIdx, 1)
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        OnUpdateBoard(board, 'Removed attachment', currCard)
    }

    if (!cardAttachments.length) return <></>
    return (
        <div className="card-attachments">
            <div className="title flex direction-row align-center">
                <AttachFileOutlinedIcon className="card-details-icon" />
                <h3 className="card-subtitle">Attachments</h3>
            </div>
            <div>
                {cardAttachments.map(cardAttachment => <AttachmentPreview key={cardAttachment.id}
                    cardAttachment={cardAttachment} onDeleteAttach={onDeleteAttach} />)}
            </div>

            <DynamicPopover type={'add-attachments'} title={'attachments'} titleModal={'Attachments'}
                board={board}
                currListIdx={currListIdx}
                currCardIdx={currCardIdx}
            />

        </div>
    )
}