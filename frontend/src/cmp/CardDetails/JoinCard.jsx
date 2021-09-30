import React from 'react';
import { connect } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { updateBoard } from '../../store/board.actions.js';

class _JoinCard extends React.Component {
    onJoinCard = (member) => {
        const { board, currListIdx, currCardIdx } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        board.lists[currListIdx].cards[currCardIdx].cardMembers.push(member)
        var action = `${member} Added to `
        this.props.updateBoard(board, action, currCard)
    }

    isMemberOnCard = (currCard, memberId) => {
        return (currCard.cardMembers.some(cardMember => cardMember._id === memberId))
    }

    render() {
        const { currListIdx, currCardIdx, loggedInUser, board } = this.props
        if (!board) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        if (this.isMemberOnCard(currCard, loggedInUser._id)) return <></>
        return (
            <>
                <h4>SUGGESTED</h4>
                <div className="btn-container join-to-card">
                    <button onClick={() => this.onJoinCard(loggedInUser)}><PersonOutlineOutlinedIcon /> Join</button>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const JoinCard = connect(mapStateToProps, mapDispatchToProps)(_JoinCard)