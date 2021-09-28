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
import { updateBoard, } from '../store/board.actions.js';

class _QuickCardEditor extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
    }

    componentDidMount() {
        // this.props.updateBoard();
    }

    toggleEditTitle = (ev) => {
        // ev.stopPropagation();
        ev.preventDefault();
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
        const { list, updateBoard, currCardIdx } = this.props;
        list.cards[currCardIdx].cardTitle = cardTitle;
        updateBoard();
        this.toggleEditTitle();
    }

    handleClose = (ev) => {
        ev.stopPropagation();
        this.setState({ ...this.state, isEditTitle: !this.state.isEditTitle })
    }
    onArchive = () => {
        const { card, board, currListIdx, currCardIdx, updateBoard} = this.props;
        board.archive.push(card);
        console.log('card', card);
        console.log('board archive',board.archive);
        // board.lists[currListIdx].cards.splice(currCardIdx, 0);
        // updateBoard();
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
    updateBoard
}

export const QuickCardEditor = connect(mapStateToProps, mapDispatchToProps)(_QuickCardEditor)