import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
export class AttachmentPreview extends React.Component {
    render() {
        const { cardAttachment } = this.props
        return (
            <a href={cardAttachment.url} target="_blank" className="card-attachment-preview flex direction-row">
                <img src={cardAttachment.url} />
                <div>
                    <div className="flex direction-row">
                        <h4 >{cardAttachment.fileName} </h4><OpenInNewIcon className="icon" />
                    </div>
                    <div>
                        <small>Added on {new Date(cardAttachment.createdAt).toString().substring(0, 16)} - </small>
                        <small className="delete" onClick={this.props.onDeleteAttach(cardAttachment.id)}> Delete </small>
                    </div>
                </div>
            </a>
        )
    }
}
