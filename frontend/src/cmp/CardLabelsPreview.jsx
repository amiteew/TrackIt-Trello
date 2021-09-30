import React from 'react';
import { connect } from 'react-redux';
import { toggleLabels } from '../store/board.actions'

class _CardLabelsPreview extends React.Component {
    onToggleLabel = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.toggleLabels()
    }

    render() {
        const { labelId, boardLabels } = this.props
        const isOpen = this.props.isLabelOpen ? ' label-preview-open' : '';
        const currLabel = boardLabels.find(label => label.id === labelId)
        return (
            <div onClick={this.onToggleLabel} className={`${currLabel.color} label-card${isOpen}`}>
                {isOpen && currLabel.title}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLabelOpen: state.boardReducer.isLabelOpen,
    }
}
const mapDispatchToProps = {
    toggleLabels
}

export const CardLabelsPreview = connect(mapStateToProps, mapDispatchToProps)(_CardLabelsPreview)