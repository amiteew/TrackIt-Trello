import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class CardPreview extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false
    }

    toggleEditTitle = () => {
        const { card } = this.props;
        this.setState({ isEditTitle: !this.state.isEditTitle, cardTitle: card.cardTitle })
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ cardTitle: value });
    }

    onSaveCardTitle = (ev) => {
        ev.preventDefault();
        this.toggleEditTitle();
        const { cardTitle } = this.state;
        if (!cardTitle) cardTitle = 'Untitled';
        const { list, onUpdateBoard, currCardIdx } = this.props;
        list.cards[currCardIdx].cardTitle = cardTitle;
        onUpdateBoard();

    }

    render() {
        const { card } = this.props
        const {cardTitle, isEditTitle} = this.state;
        return (
            <Draggable draggableId={card.cardId} index={this.props.index}>
                {(provided) => (
                    < div className="card-preview-title" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {!isEditTitle && <h1 onClick={this.toggleEditTitle}>{card.cardTitle}</h1>}
                        {isEditTitle &&
                            <form onSubmit={this.onSaveCardTitle}>
                                <input type="text" value={cardTitle} autoFocus onChange={this.handleChange} />
                            </form>
                        }
                        {provided.placeholder}
                    </div>
                )
                }
            </Draggable>

        )
    }
}