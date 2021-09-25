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
import { QuickCardEditor } from './QuickCardEditor.jsx';

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
            <div className="card-list-preview">
            <Draggable draggableId={card.cardId} index={currCardIdx}>
                {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Route exact component={CardDetails} path="/board/:boardId/:listId/:cardId" />
                        <Link to={`/boards/${board._id}/${list.listId}/${card.cardId}`} >
                            {/* {card.cardLabelIds && <CardLabelsList cardLabelIds={card.cardLabelIds} boardLabels={board.labels} />} */}
                            {!isEditTitle && <h1 className="card-preview-title" onClick={this.toggleEditTitle}>{card.cardTitle}</h1>}
                            {isEditTitle && <QuickCardEditor />
                                // <form onSubmit={this.onSaveCardTitle}>
                                //     <input type="text" value={cardTitle} autoFocus onChange={this.handleChange} />
                                // </form>
                            }
                            <div className="card-preview-icon flex">
                                <span className="badge-icon">{card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />} </span>
                                {card.cardMembers && <MembersList members={card.cardMembers} />}
                                <span className="badge-icon" title="checklist">{card.checklists.length ? <CardCheckPreview checklists={card.checklists} /> : <> </>}</span>
                                {card.comments.length ? <CardCommentPreview cardComments={card.comments} /> : <> </>}
                            </div>
                        </Link>
                        {/* <MoveCard /> */}
                    </div>
                )
                }
            </Draggable>
            </div>

        )
    }
}