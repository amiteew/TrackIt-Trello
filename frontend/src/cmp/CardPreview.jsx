import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MembersList } from './MembersList.jsx';
import { CardCheckPreview } from './CardCheckPreview.jsx';
import { CardCommentPreview } from './CardCommentPreview.jsx';
import { CardVisibilityPreview } from './CardVisibilityPreview.jsx';
import { Link } from 'react-router-dom';
import { QuickCardEditor } from './QuickCardEditor.jsx';
import { AddToCard } from './AddToCard.jsx';
import { BsPencil } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { connect } from 'formik';
// import { updateBoard } from '../store/board.actions.js';
import { TextareaAutosize } from '@mui/material';

export class CardPreview extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
    }

    componentDidMount() {
        // this.props.updateBoard();
    }

    toggleEditTitle = (ev) => {
        ev.stopPropagation();
        const { card } = this.props;
        this.setState({ isEditTitle: !this.state.isEditTitle, cardTitle: card.cardTitle })
    }

    handleChange = (ev) => {
        ev.stopPropagation();
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSaveCardTitle(this.state.cardTitle);
            return;
        }
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
        const { isEditTitle, cardTitle } = this.state;
        return (
            <Draggable draggableId={card.cardId} index={currCardIdx}>
                {(provided) => (
                    <div className="card-preview-contenet" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Link className="flex" to={`/boards/${board._id}/${list.listId}/${card.cardId}`}>
                            <div>{!isEditTitle && <span className="card-preview-title">{card.cardTitle}</span>}
                                {isEditTitle &&
                                    <div>
                                        <TextareaAutosize
                                            value={cardTitle}
                                            aria-label="card title"
                                            onChange={this.handleChange}
                                            onKeyPress={this.handleChange}
                                            autoFocus
                                        />
                                        <AddToCard board={board} currListIdx={currListIdx} currCardIdx={currCardIdx} OnUpdateBoard={OnUpdateBoard} />
                                    </div>
                                }
                                <div className="card-preview-icon flex">
                                    {card.description && <div className='badge flex align-center'><GrTextAlignFull /></div>}
                                    <span className="badge is-watch">{card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />} </span>
                                    {card.comments.length ? <CardCommentPreview cardComments={card.comments} /> : <> </>}
                                    <div title="checklist">{card.checklists.length ? <CardCheckPreview checklists={card.checklists} /> : <> </>}</div>
                                    <div className="badge-icon">{card.cardMembers && <MembersList members={card.cardMembers} />}</div>
                                </div>
                                <button className="quick-card-edit-btn" onClick={this.toggleEditTitle}> <BsPencil /> </button>
                            </div>
                        </Link>
                    </div>
                )
                }
            </Draggable>

        )
    }
}

// function mapStateToProps(state) {
//     return {
//         board: state.boardReducer.board,
//         loggedInUser: state.userReducer.loggedInUser
//     }
// }
// const mapDispatchToProps = {
//     updateBoard
// }

// export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview)