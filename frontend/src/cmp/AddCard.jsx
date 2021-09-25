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
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddCard();
            return;
        }
        const value = ev.target.value;
        this.setState({ cardTitle: value });
    }

    onAddCard = () => {
        let cardTitle = this.state.cardTitle;
        if (!cardTitle) cardTitle = 'Untitled';
        const newCard = {
            cardId: utilService.makeId(),
            cardTitle,
            description: "",
            comments: [],
            cardMembers: [],
            cardLabelIds: [],
            checklists: [],
            createdAt: new Date(),
            dueDate: {},
            attachment: [{
                src: ''
            }],
            cardStyle: {}
        }
        const { list } = this.props;
        list.cards.push(newCard);
        this.setState({ cardTitle: "" })
        const action = `Added card "${cardTitle}"`;
        this.props.onUpdateBoard(action, newCard, cardTitle);
        this.props.onCloseAdding();
    }

    render() {
        const { cardTitle } = this.state;
        return (
            <div>
                <TextareaAutosize
                    value={cardTitle}
                    placeholder="Enter a title for this card..."
                    aria-label="empty textarea"
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    onBlur={this.onAddCard}
                    autoFocus
                />
                <button>Add card</button>
                <button onClick={this.props.onCloseAdding}>X</button>
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