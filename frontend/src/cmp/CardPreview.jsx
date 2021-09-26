import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MembersList } from './MembersList.jsx';
import { CardCheckPreview } from './CardCheckPreview.jsx';
import { MoveCard } from './MoveCard.jsx';
import { DynamicPopover } from './DynamicPopover.jsx';
import { CardCommentPreview } from './CardCommentPreview.jsx';
import { CardVisibilityPreview } from './CardVisibilityPreview.jsx';
import { Route, Link } from 'react-router-dom';
import { QuickCardEditor } from './QuickCardEditor.jsx';
import { AddToCard } from './AddToCard.jsx';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
export class CardPreview extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
    }

    toggleEditTitle = (ev) => {
        const { card } = this.props;
        this.setState({ isEditTitle: !this.state.isEditTitle, cardTitle: card.cardTitle })
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ cardTitle: value });
    }

    onSaveCardTitle = (cardTitle) => {
        if (!cardTitle) return;
        const { list, onUpdateBoard, currCardIdx } = this.props;
        list.cards[currCardIdx].cardTitle = cardTitle;
        onUpdateBoard();
        this.toggleEditTitle();
    }

    handleClose = (ev) => {
        ev.stopPropagation();
        this.setState({ ...this.state, isEditTitle: !this.state.isEditTitle })
    }

    render() {
        const { card, board, currListIdx, currCardIdx, list, OnUpdateBoard } = this.props
        const { isEditTitle } = this.state;
        return (
            <div className="card-list-preview">
                <Draggable draggableId={card.cardId} index={currCardIdx}>
                    {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <button className="quick-card-edit-btn" onClick={this.toggleEditTitle}> <EditOutlinedIcon /> </button>
                            {/* {card.cardLabelIds && <CardLabelsList cardLabelIds={card.cardLabelIds} boardLabels={board.labels} />} */}
                            <Link to={`/boards/${board._id}/${list.listId}/${card.cardId}`}>
                                {!isEditTitle && <h1 className="card-preview-title">{card.cardTitle}</h1>}
                                {isEditTitle &&
                                    <Modal open={true} onClose={this.handleClose}>
                                        <Box className="quic-card-edit">
                                            <QuickCardEditor card={card} onSaveCardTitle={this.onSaveCardTitle} handleClose={this.handleClose} />
                                        </Box>
                                        <AddToCard board={board} currListIdx={currListIdx} currCardIdx={currCardIdx} OnUpdateBoard={OnUpdateBoard} />
                                    </Modal >
                                }
                                <div className="card-preview-icon flex">
                                    <span className="badge-icon">{card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />} </span>
                                    {card.cardMembers && <MembersList members={card.cardMembers} />}
                                    <span className="badge-icon" title="checklist">{card.checklists.length ? <CardCheckPreview checklists={card.checklists} /> : <> </>}</span>
                                    {card.comments.length ? <CardCommentPreview cardComments={card.comments} /> : <> </>}
                                </div>
                                <div className="quick-edit-card-btn">
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