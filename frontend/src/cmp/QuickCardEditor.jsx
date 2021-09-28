import React from 'react';
import { MembersList } from './MembersList.jsx';
import { CardCheckPreview } from './CardCheckPreview.jsx';
import { CardCommentPreview } from './CardCommentPreview.jsx';
import { CardVisibilityPreview } from './CardVisibilityPreview.jsx';
import { AddToCard } from './AddToCard.jsx';
import { BsPencil } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { connect } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import { updateBoard, loadListAndCard } from '../store/board.actions.js';

class _QuickCardEditor extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
    }

    componentDidMount() {
        // this.props.updateBoard();
    }

    toggleEditTitle = (ev) => {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        const { card, isEditMode } = this.props;
        isEditMode();
        this.setState({ isEditTitle: !this.state.isEditTitle, cardTitle: card.cardTitle })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSaveCardTitle(this.state.cardTitle);
            return;
        }
        const value = ev.target.value;
        this.setState({ ...this.state, cardTitle: value });
    }

    onSaveCardTitle = () => {
        const { cardTitle } = this.state
        if (!cardTitle) return;
        const { board, card, updateBoard } = this.props;
        card.cardTitle = cardTitle;
        const action = "Edit title";
        updateBoard(board, action, card);
        this.toggleEditTitle();
        this.props.isEditMode();
    }

    onSelectedCard = () => {
        const { list } = this.props;
        this.props.loadList(list);
    }

    handleClose = (ev) => {
        ev.stopPropagation();
        this.setState({ ...this.state, isEditTitle: !this.state.isEditTitle })
    }

    onArchive = (ev) => {
        ev.preventDefault();
        const { card, board, list, currCardIdx, updateBoard } = this.props;
        // board.archive.push(...board);
        list.cards.splice(currCardIdx, 1);
        updateBoard(board);
    }

    render() {
        const { card, board, currListIdx, currCardIdx, OnUpdateBoard } = this.props
        const { isEditTitle, cardTitle } = this.state;
        return (
            <div>
                {!isEditTitle && <span className="card-preview-title">{card.cardTitle}</span>}
                {isEditTitle &&
                    <div className="quick-card-edit-preview">
                        <TextareaAutosize
                            value={cardTitle}
                            aria-label="card title"
                            onChange={this.handleChange}
                            onKeyPress={this.handleChange}
                            // onBlur={this.onSaveCardTitle}
                            autoFocus
                        />
                        <button onClick={this.onSaveCardTitle}>save</button>
                        <AddToCard board={board} currListIdx={currListIdx} currCardIdx={currCardIdx} OnUpdateBoard={OnUpdateBoard} />
                        <div onClick={this.onArchive}>Archive</div>
                    </div>
                }
                <div className="card-preview-icon flex">
                    {card.description && <div className='badge flex align-center'><GrTextAlignFull /></div>}
                    <span className="badge is-watch">{card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />} </span>
                    {card.comments.length ? <CardCommentPreview cardComments={card.comments} /> : <> </>}
                    <div title="checklist">{card.checklists.length ? <CardCheckPreview checklists={card.checklists} /> : <> </>}</div>
                    <div className="badge-icon">{card.cardMembers && <MembersList members={card.cardMembers} />}</div>
                </div>
                <button className="quick-card-edit-btn" onClick={this.toggleEditTitle}><BsPencil /></button>
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
    loadListAndCard
}

export const QuickCardEditor = connect(mapStateToProps, mapDispatchToProps)(_QuickCardEditor)