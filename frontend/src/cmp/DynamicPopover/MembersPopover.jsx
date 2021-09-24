import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
export class MembersPopover extends React.Component {
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
        this.props.OnUpdateBoard(newBoard, action, currCard)
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
                <h3>Board Members</h3>
                {board.boardMembers.length && board.boardMembers.map(member => (
                    <div onClick={() => this.toggleMember(member)} >
                        <Avatar alt={member.fullname} src={member.imgUrl}
                            key={member._id} />
                        <h4>{member.fullname} ({member.username})</h4>
                        {this.isMemberOnCard(currCard, member._id) && <p>v</p>}
                    </div>
                ))}
            </section>
        )
    }
}
