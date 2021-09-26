import React from 'react';
import { CardList } from './CardList.jsx';
import { AddCard } from './AddCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { boardService } from '../services/board.service.js';
import { DynamicPopover } from './DynamicPopover.jsx';
import { BsPlus } from 'react-icons/bs';
import { TextareaAutosize } from '@mui/material';
import { BsThreeDots } from "react-icons/bs";

export class ListPreview extends React.Component {

    state = {
        isAdding: false,
        listTitle: "",
        isEditTitle: false
    }

    toggleOnAdd = () => {
        this.setState({ isAdding: !this.state.isAdding })
    }
    onCloseAdding = () => {
        this.toggleOnAdd();
    }

    toggleEditTitle = () => {
        const { list } = this.props;
        this.setState({ isEditTitle: !this.state.isEditTitle, listTitle: list.listTitle })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSaveListTitle();
        }
        const value = ev.target.value;
        this.setState({ listTitle: value });
    }

    onSaveListTitle = () => {
        this.toggleEditTitle();
        const { listTitle } = this.state;
        if (!listTitle) listTitle = 'Untitled';
        const { onUpdateBoard, board, currListIdx } = this.props;
        board.lists[currListIdx].listTitle = listTitle;
        onUpdateBoard();
    }


    render() {
        const { list, onUpdateBoard, currListIdx, board } = this.props
        const { isAdding, isEditTitle, listTitle } = this.state
        return (
            <Draggable draggableId={list.listId} index={currListIdx}>
                {provided => (
                <section className="list-wrapper" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="list-content flex direction-col">
                        <div className="list-header flex">
                            {!isEditTitle && <h2 onClick={this.toggleEditTitle}>{list.listTitle}</h2>}
                            {isEditTitle &&
                                <TextareaAutosize
                                    value={listTitle}
                                    aria-label="empty textarea"
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleChange}
                                    onBlur={this.onSaveListTitle}
                                    autoFocus
                                />                        
                            }
                            <div className="list-header-menu-btn">
                                <DynamicPopover type={'list actions'} board={board} list={list} title={<BsThreeDots />} onUpdateBoard={onUpdateBoard} titleModal={'List actions'} />
                            </div>
                        </div>
                        <CardList key={list.listId} cards={list.cards} board={board} currListIdx={currListIdx} list={list} onUpdateBoard={onUpdateBoard} />
                        {!isAdding && <h1 className="add-card-container" onClick={() => {
                            this.toggleOnAdd()
                        }}><BsPlus /> Add another card</h1>}
                        {isAdding && <AddCard list={list} onUpdateBoard={onUpdateBoard} onCloseAdding={this.onCloseAdding} />}
                    </div>
                </section >
                 )
                }
            </Draggable>
        )
    }
}