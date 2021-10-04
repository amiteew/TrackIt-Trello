import React from 'react';
import { connect } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import { utilService } from '../../services/util.service.js'
import { updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';

class _EditLabel extends React.Component {

    state = {
        labelName: '',
        labelColor: '',
        isDelete: false,
        labelsColor: []
    }

    componentDidMount() {
        const { currlabel } = this.props;
        this.createLabelsArr();
        if (currlabel) this.setState({ labelName: currlabel.title });
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSaveLabel();
            return;
        }
        const value = ev.target.value;
        this.setState({ labelName: value });
    }

    onSaveLabel = () => {
        const { labelName, labelColor } = this.state;
        const { board, currlabel } = this.props;
        if (currlabel) {
            currlabel.title = labelName ? labelName : currlabel.title;
            currlabel.color = labelColor ? labelColor : currlabel.color;
        } else {
            board.labels.push({ id: utilService.makeId(), title: labelName, color: labelColor })
        }
        this.props.updateBoard(board);
        this.props.toggleEditLabel();
    }

    labelChoose = (labelColor) => {
        this.setState({ ...this.state, labelColor })
    }

    deleteLabel = () => {
        const { currlabel, board } = this.props
        const labelIdx = board.labels.findIndex(label => label.id === currlabel.id)
        board.labels.splice(labelIdx, 1);
        this.props.updateBoard(board);
    }

    confirmDeleteLabel = () => {
        this.setState({ ...this.state, isDelete: !this.state.isDelete })
    }

    createLabelsArr = () => {
        let labelsColor = [];
        let clrNum = 1;
        for (let i = 0; i < 11; i++) {
            labelsColor.push('clr' + clrNum++);
        }
        this.setState({ ...this.state, labelsColor })
    }

    isLabelChoosen = (chosenLabel) => {
        return chosenLabel === this.state.labelColor;
    }
    render() {
        const { labelName, isDelete, labelsColor } = this.state;
        const { currlabel } = this.props;

        return (
            <div>
                {!isDelete && <div>
                    <label className="edit-labels-label">Name</label>
                    <TextareaAutosize className="text-area-auto label-input"
                        value={labelName}
                        aria-label="empty textarea"
                        onChange={this.handleChange}
                        onKeyPress={this.handleChange}
                        autoFocus
                    />
                    <label className="edit-labels-label">Select a color</label>
                    <div className="color-plate">
                        {labelsColor.map(label => (
                            <div className={`color-sqr pointer + ${label}`} onClick={() => this.labelChoose(label)} >
                                {this.isLabelChoosen(label) && <DoneIcon />}
                            </div>))}
                        <p className="label-no-color">No color</p>
                    </div>
                    <div className="edit-labels-actions flex space-between">
                        <div className="edit-labels-btn save pointer" onClick={this.onSaveLabel}>Save</div>
                        {currlabel && <div className="edit-labels-btn delete pointer" onClick={this.confirmDeleteLabel}>Delete</div>}
                    </div>
                </div>}
                {isDelete && <div>
                    <p className="edit-label-delete">There is no undo. This will remove this label from all cards and destroy its history.</p>
                    <div className="edit-labels-btn delete deleted pointer" onClick={this.deleteLabel}>Delete</div>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards
    }
}

const mapDispatchToProps = {
    // loadBoards,
    // removeBoard,
    // addBoard,
    updateBoard
}

export const EditLabel = connect(mapStateToProps, mapDispatchToProps)(_EditLabel)