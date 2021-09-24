import React from 'react';
import Avatar from '@mui/material/Avatar';
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
    toggleMember = (memberId) => {
        const { board, currListIdx, currCardIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        if (this.isMemberOnCard(currCard, memberId)) {
            const memberIdx = currCard.cardMembers.findIndex(cardMember => cardMember._id === memberId)
            board.lists[currListIdx].cards[currCardIdx].cardMembers.splice(memberIdx, 1)
            var action = 'Removed from card'
        } else {
            board.lists[currListIdx].cards[currCardIdx].cardMembers.push()
            var action = 'Added from card'
        }

        // this.props.OnUpdateBoard(board, action, currCard)
    }
    isMemberOnCard = (currCard, memberId) => {
        return (currCard.cardMembers.some(cardMember => cardMember._id === memberId))
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <React.Fragment></React.Fragment>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <section className="members-popover">
                <h3>Board Members</h3>
                {board.boardMembers.length && board.boardMembers.map(member => (
                    <div onClick={() => this.toggleMember(member._id)} >
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