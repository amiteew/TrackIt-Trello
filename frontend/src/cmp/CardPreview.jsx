import React from 'react';

export class CardPreview extends React.Component {
    render() {
        const { card} = this.props
        return (
            <div className="card-preview-title">
                <h1>{card.cardTitle}</h1>
            </div>
        )
    }
}