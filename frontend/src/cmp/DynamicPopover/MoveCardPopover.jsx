import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../store/board.actions.js';

class _MoveCardPopover extends React.Component {

    render() {
        return (
            <div>Move Card</div>
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

export const MoveCardPopover = connect(mapStateToProps, mapDispatchToProps)(_MoveCardPopover)