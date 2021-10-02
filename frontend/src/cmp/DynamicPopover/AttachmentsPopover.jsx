import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import { cloudinaryService } from '../../services/cloudinary.service.js';
import DoneIcon from '@mui/icons-material/Done';
import { color } from '@mui/system';
class _AttachmentsPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    onAddAttach = async (ev) => {
        const attachment = await cloudinaryService.uploadFile(ev)
        console.log('attachment', attachment)
        const { board, currListIdx, currCardIdx } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        currCard.attachments.unshift(attachment)
        console.log('cuurent card: ', currCard)
        this.props.updateBoard(board, 'Added a new attachment', currCard)
        this.props.handleClose()
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        return (
            <section className="popover-attachment flex direction-col">
                <label htmlFor="file-upload">Computer</label>
                <input id="file-upload" type="file" onChange={this.onAddAttach} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard
}

export const AttachmentsPopover = connect(mapStateToProps, mapDispatchToProps)(_AttachmentsPopover)