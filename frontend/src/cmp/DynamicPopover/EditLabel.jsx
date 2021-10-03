import React from 'react';
import { connect } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import { utilService } from '../../services/util.service.js'
import { updateBoard } from '../../store/board.actions.js';
class _EditLabel extends React.Component {

    state = {
        labelName: '',
        labelColor: '',
    }

    componentDidMount() {
        const { currlabel } = this.props;
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

    render() {
        const { labelName } = this.state;
        const { board, currlabel } = this.props;
        console.log('currlabel', currlabel);
        // const labelName = currlabel ? currlabel.title : '';
        return (
            <div>
                <TextareaAutosize className="text-area-auto"
                    value={labelName}
                    aria-label="empty textarea"
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    // onBlur={this.onAddCard}
                    autoFocus
                />
                <div className="color-plate">
                    {board.labels.map(label => (
                        <div key={label.id} className={`color-sqr pointer + ${label.color}`} onClick={() => this.labelChoose(label.color)} >

                        </div>))}
                </div>
                {currlabel && <div className="pointer" onClick={this.deleteLabel}>Delete</div>}
                <div className="pointer" onClick={this.onSaveLabel}>Save</div>
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