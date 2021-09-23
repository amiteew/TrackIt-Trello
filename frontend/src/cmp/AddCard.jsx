import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../store/board.actions.js';
import { utilService } from '../services/util.service.js';

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
        this.setState({cardTitle: ""})
        this.props.onUpdateBoard();
    }

    render() {
        const { cardTitle } = this.state;
        return (
            <div>
                <form onSubmit={this.onAddCard} >
                    <textarea
                        type="text"
                        name="cardTitle"
                        value={cardTitle}
                        placeholder="Enter a title for this card..."
                        onChange={this.handleChange}
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