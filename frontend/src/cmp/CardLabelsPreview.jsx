import React from 'react';

export class CardLabelsPreview extends React.Component {
    state = {
        isOpen: false
    }

    toggleLabel = (ev, labelId) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({ isOpen: !this.state.isOpen });
    }


    render() {
        const { isOpen } = this.state;
        const { labelId, boardLabels } = this.props
        const className = isOpen ? 'label-preview-open' : '';
        const currLabel = boardLabels.find(label => label.id === labelId)
        return (
            <div onClick={this.toggleLabel} className={`${currLabel.color} label-card ${className}`}>
                {isOpen && currLabel.title}
            </div>
        )
    }

}