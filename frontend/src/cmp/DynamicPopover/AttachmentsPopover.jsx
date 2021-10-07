import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import { cloudinaryService } from '../../services/cloudinary.service.js';
import DoneIcon from '@mui/icons-material/Done';
import { color } from '@mui/system';
import { utilService } from '../../services/util.service';
class _AttachmentsPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        urlLink: ''
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    onAddAttach = async (ev) => {
        const attachment = await cloudinaryService.uploadFile(ev)
        const { board, currListIdx, currCardIdx } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        currCard.attachments.unshift(attachment)
        this.props.updateBoard(board, 'Attached', currCard)
        this.props.handleClose()
    }

    // onAddLink = (ev) => {
    //     console.log('even url', ev.target.value);
    //     const attach = {
    //         id: utilService.makeId(),
    //         fileName: 'test',
    //         url: ev.target.value,
    //         createdAt: Date.now()
    //     }
    //     console.log('attach', attach);
    //     const { board, currListIdx, currCardIdx } = this.props
    //     const currCard = board.lists[currListIdx].cards[currCardIdx]
    //     currCard.attachments.unshift(attach)
    //     this.props.updateBoard(board, 'Attached', currCard)
    // }

    render() {
        const { board, currListIdx, currCardIdx, urlLink } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        return (
            <section className="popover-attachment flex direction-col">
                <label htmlFor="file-upload">Computer</label>
                <input id="file-upload" type="file" onChange={this.onAddAttach} />

                {/* <label htmlFor="url">Enter an https:// URL:</label>
                <input type="text" value={urlLink} onChange={this.onAddLink} /> */}

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