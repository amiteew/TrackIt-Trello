import React from 'react';
import { connect } from 'react-redux';
import { updateBoard, loadListAndCard, loadBoard } from '../store/board.actions.js';
import Divider from '@mui/material/Divider';
import { TextareaAutosize } from '@mui/material';


class _SearchMenu extends React.Component {

    state = {
        searchCards: ''
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ searchCards: value });
    }

    render() {
        const { board } = this.props;
        const { searchCards } = this.state;
        return (
            <div className="search cards">
                <TextareaAutosize className="text-area-auto search-input"
                    value={searchCards}
                    placeholder="Enter a title for this card..."
                    aria-label="empty textarea"
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    // onBlur={this.onAddCard}
                    autoFocus
                />
                <p>Search by term, label, member, or due time.</p>
                <Divider />

            </div>

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
    loadListAndCard,
    loadBoard
}

export const SearchMenu = connect(mapStateToProps, mapDispatchToProps)(_SearchMenu)