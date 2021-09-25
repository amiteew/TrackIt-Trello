import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import { utilService } from '../../services/util.service.js';
class _ChecklistPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        title: 'Checklist'
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ ...this.state, board, currListIdx, currCardIdx })
    }

    handleChange = ({ target }) => {
        this.setState({ ...this.state, title: target.value })
        // this.setState({ ...this.state, board: boardToUpdate })
    }

    onAddChecklist = (ev) => {
        ev.preventDefault();
        const { currListIdx, currCardIdx, title, board } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        const action = `Added Checklist "${title}"`
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx].checklists.push({
            checklistId: utilService.makeId(),
            title,
            tasks: []
        })
        this.props.updateBoard(boardToUpdate, action, currCard)
        this.props.handleClose()
    }

    render() {
        const { board, currListIdx, currCardIdx, title } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        return (
            <section className="members-popover">
                <h5>Title</h5>
                <form onSubmit={this.onAddChecklist}>
                    <input
                        name='cardTitle'
                        type='text'
                        onChange={this.handleChange}
                        value={title}
                    />
                    <button>Add</button>
                </form>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const ChecklistPopover = connect(mapStateToProps, mapDispatchToProps)(_ChecklistPopover)