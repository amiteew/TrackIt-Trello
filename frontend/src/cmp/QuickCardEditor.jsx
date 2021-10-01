import React from 'react';
import { MembersList } from './MembersList.jsx';
import { CardCheckPreview } from './CardCheckPreview.jsx';
import { CardCommentPreview } from './CardCommentPreview.jsx';
import { BsPencil } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { connect } from 'react-redux';
import { TextareaAutosize } from '@mui/material';

import { updateBoard, loadListAndCard } from '../store/board.actions.js';
import { CardLabelsPreview } from './CardLabelsPreview.jsx';
// import Popover from '@mui/material/Popover';
// import { DynamicPopover } from '../cmp/DynamicPopover.jsx';
// import { CardVisibilityPreview } from './CardVisibilityPreview.jsx';
// import { AddToCard } from './AddToCard.jsx';
// import { CardDuDatePreview } from './CardDuDatePreview.jsx';

class _QuickCardEditor extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
        anchorEl: null,
    }

    toggleEditTitle = (ev) => {
        if (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            this.setState({ anchorEl: ev.currentTarget })
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

    handleClose = (ev) => {
        ev.stopPropagation();
        this.setState({ ...this.state, isEditTitle: !this.state.isEditTitle })
    }

    onArchive = (ev) => {
        ev.preventDefault();
        const { card, board, list, currCardIdx, updateBoard } = this.props;
        // board.archive.push(...board);
        list.cards.splice(currCardIdx, 1);
        const action = `Delete card`;
        updateBoard({ ...board }, action, card);
        this.toggleEditTitle();
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClosePop = () => {
        this.setState({ anchorEl: null })
    };

    render() {
        // const { card, board, currListIdx, currCardIdx, OnUpdateBoard, loggedInUser } = this.props
        const { card, board } = this.props
        const { isEditTitle, cardTitle, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const coverStyle = card.cardStyle.img ? 'img-cover' : card.cardStyle.color
        const isCover = card.cardStyle.isCover ? { fullCover: 'full ' + coverStyle, fullTitle: 'full' } : { fullTitle: 'half' }
        console.log('coverstyle', coverStyle);
        return (
            <div className={"card-preview-content pointer"}>
                {card.cardStyle.id && <div className={'card-preview-header ' + coverStyle} style={{ backgroundImage: `url(${card.cardStyle.img})` }}></div>}
                <div className={"card-preview-main-content " + isCover.fullCover}>
                    {isCover.fullTitle === 'half' && <div className="list-card-labels flex"> {card.cardLabelIds && card.cardLabelIds.map(labelId => <CardLabelsPreview key={labelId} labelId={labelId} boardLabels={board.labels} />)}</div>}
                    {!isEditTitle && <span className={"card-preview-title " + isCover.fullCover}>{card.cardTitle}</span>}
                    {isEditTitle &&
                        // <Popover
                        //     id={id}
                        //     open={open}
                        //     anchorEl={anchorEl}
                        //     onClose={this.handleClosePop}
                        //     anchorOrigin={{
                        //         vertical: 'top',
                        //         horizontal: 'top',
                        //     }}
                        //     transformOrigin={{
                        //         vertical: 'center',
                        //         horizontal: 'center',
                        //     }}
                        // >
                        <div className="quick-card-edit-preview">
                            <TextareaAutosize className="quick-card-input"
                                value={cardTitle}
                                aria-label="card title"
                                onChange={this.handleChange}
                                onKeyPress={this.handleChange}
                                autoFocus
                            />
                            <div onClick={this.onArchive}>Archive</div>

                            {/* <button onClick={this.onSaveCardTitle}>save</button>
                                <AddToCard board={board} currListIdx={currListIdx} currCardIdx={currCardIdx} OnUpdateBoard={OnUpdateBoard} /> */}
                        </div>
                        // </Popover >
                    }
                    {isCover.fullTitle === 'half' && <span className="card-preview-icon flex align-center">
                        <div className="badge-wrapper flex wrap align-center">
                            {card.description && <div className='badge flex align-center'><GrTextAlignFull /></div>}
                            {/* <span className="badge is-watch">{card.cardMembers && <CardVisibilityPreview cardMembers={card.cardMembers} />} </span> */}
                            {card.comments.length ? <CardCommentPreview cardComments={card.comments} /> : <> </>}
                            {/* {card.dueDate.date && <CardDuDatePreview dueDate={card.dueDate}/>} */}
                            <div title="checklist">{card.checklists.length ? <CardCheckPreview checklists={card.checklists} /> : <> </>}</div>
                        </div>
                        <div className="badge-icon members flex">{card.cardMembers && <MembersList members={card.cardMembers} currCard={card} isCardOpen={false} />}
                        </div>
                    </span>}
                    <button className="quick-card-edit-btn" onClick={this.toggleEditTitle}><BsPencil /></button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board
        // loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard,
    loadListAndCard
}

export const QuickCardEditor = connect(mapStateToProps, mapDispatchToProps)(_QuickCardEditor)