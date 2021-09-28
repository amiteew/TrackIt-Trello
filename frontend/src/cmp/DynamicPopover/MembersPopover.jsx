import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import { TextareaAutosize } from '@mui/material';
class _MembersPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    toggleMember = (member) => {
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        const currCard = newBoard.lists[currListIdx].cards[currCardIdx]
        if (this.isMemberOnCard(currCard, member._id)) {
            const memberIdx = currCard.cardMembers.findIndex(cardMember => cardMember._id === member._id)
            newBoard.lists[currListIdx].cards[currCardIdx].cardMembers.splice(memberIdx, 1)
            var action = 'Removed from '
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardMembers.push(member)
            var action = 'Added to '
        }
        this.props.updateBoard(newBoard, action, currCard)
    }

    isMemberOnCard = (currCard, memberId) => {
        return (currCard.cardMembers.some(cardMember => cardMember._id === memberId))
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <section className="members-popover">
                <TextareaAutosize
                    className="search-members text-area-auto"
                    placeHolder="Search members"
                    type='text'
                // value={txt}
                // onChange={this.handleChange}
                // onKeyPress={this.handleChange}
                // onBlur={this.onDiscardChanges}
                // autoFocus
                />
                <h3>Board Members</h3>
                {board.boardMembers.length && board.boardMembers.map(member => (
                    <div className="member-preview flex direction-row space-between" onClick={() => this.toggleMember(member)} >
                        <div className="flex direction-row">
                            <Avatar className="card-details-avatar" alt={member.fullname} src={member.imgUrl}
                                key={member._id} />
                            <div className="flex align-center">{member.fullname} ({member.username})</div>
                        </div>
                        {this.isMemberOnCard(currCard, member._id) && <DoneIcon />}
                    </div>
                ))}
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

export const MembersPopover = connect(mapStateToProps, mapDispatchToProps)(_MembersPopover)