import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MembersList } from './MembersList.jsx';
import { DueDatePreview } from './DueDatePreview.jsx';
import { CardLabelsList } from './CardLabelsList.jsx';
import { CardCheckPreview } from './CardCheckPreview.jsx';
import { MoveCard } from './MoveCard.jsx';
import { DynamicPopover } from './DynamicPopover.jsx';
import { CardCommentPreview } from './CardCommentPreview.jsx';
import { CardVisibilityPreview } from './CardVisibilityPreview.jsx';
import { Route, Link } from 'react-router-dom';
import { CardDetails } from '../pages/CardDetails.jsx';

export class CardPreview extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
        isOpenDetails: false
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
        const { card, board, currListIdx, currCardIdx, onUpdateBoard, list } = this.props
        const { cardTitle, isEditTitle, isOpenDetails } = this.state;
        return (
            <Draggable draggableId={card.cardId} index={currCardIdx}>
                {(provided) => (
                    < div className="card-preview-title" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {card.cardLabelIds && <CardLabelsList cardLabelIds={card.cardLabelIds} boardLabels={board.labels} />}
                        {!isEditTitle && <h1 onClick={this.toggleEditTitle}>{card.cardTitle}</h1>}
                        {isEditTitle &&
                            <form onSubmit={this.onSaveCardTitle}>
                                <input type="text" value={cardTitle} autoFocus onChange={this.handleChange} />
                            </form>
                        }
                        <Route exact component={CardDetails} path="/board/:boardId/:listId/:cardId" />
                        <Link to={`/boards/${board._id}/${list.listId}/${card.cardId}`} ></Link>


                        {card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />}
                        {card.cardMembers && <MembersList members={card.cardMembers} />}
                        {card.checklists && <CardCheckPreview checklists={card.checklists} />}
                        {card.comments && <CardCommentPreview cardComments={card.comments} />}
                        {/* <MoveCard /> */}
                    </div>
                )
                }
            </Draggable>

        )
    }
}