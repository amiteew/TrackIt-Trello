import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../store/board.actions.js';
import { utilService } from '../services/util.service.js';
import { TextareaAutosize } from '@mui/material';


export class _AddCard extends React.Component {
    state = {
        cardTitle: ""
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ cardTitle: value });
    }

    onAddCard = (ev) => {
        ev.preventDefault();
        const cardTitle = this.state.cardTitle;
        const newCard = {
            cardId: utilService.makeId(),
            cardTitle
        }
        const { list } = this.props;
        list.cards.push(newCard);
        this.setState({ cardTitle: "" })
        const action = "added card";
        this.props.onUpdateBoard(action, newCard, cardTitle);
    }

    render() {
        const { cardTitle } = this.state;
        return (
            <div>
                <form onSubmit={this.onAddCard} >
                    <TextareaAutosize
                        value={cardTitle}
                        placeholder="Enter a title for this card..."
                        aria-label="empty textarea"
                        onChange={this.handleChange}
                        autoFocus
                    />
                    <button>Add card</button>
                    <button onClick={this.props.onCloseAdding}>X</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards
    }
}
const mapDispatchToProps = {
    updateBoard
}

export const AddCard = connect(mapStateToProps, mapDispatchToProps)(_AddCard)