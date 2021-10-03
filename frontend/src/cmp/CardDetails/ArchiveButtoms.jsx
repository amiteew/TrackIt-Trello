import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../store/board.actions.js';
import { DynamicPopover } from '../DynamicPopover.jsx';

class _ArchiveButtoms extends React.Component {

    onToggleArchived = () => {
        const { board, currCard } = this.props
        currCard.isArchived = !currCard.isArchived
        this.props.updateBoard(board, `Archived card ${currCard.title}`, currCard)
    }

    onDeleteCard = () => {
        const { board, currListIdx, currCardIdx, currCard } = this.props
        this.props.handleClose()
        board.lists[currListIdx].cards.splice(currCardIdx, 1)
        this.props.updateBoard(board, `Deleted card`, currCard)
    }

    render() {
        const { currCard } = this.props
        return (
            <>
                {
                    !currCard.isArchived &&
                    <button onClick={this.onToggleArchived}>Archive</button>
                }
                {
                    currCard.isArchived && <>
                        <button onClick={this.onToggleArchived}>Send to board</button>
                        <DynamicPopover type={'delete-card'} titleModal={'Delete card?'}
                            onDeleteCard={this.onDeleteCard} />
                    </>
                }

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
    updateBoard,
}

export const ArchiveButtoms = connect(mapStateToProps, mapDispatchToProps)(_ArchiveButtoms)