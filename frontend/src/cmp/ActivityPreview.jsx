import React from 'react';

export class ActivityPreview extends React.Component {

    render() {
        const { activity } = this.props
        return (
            <div className="card-preview-title">
                <h1>activity</h1>
            </div>

        )
    }
}