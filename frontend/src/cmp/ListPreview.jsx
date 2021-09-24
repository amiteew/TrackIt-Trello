import React from 'react';
import { CardList } from './CardList.jsx';
import { AddCard } from './AddCard';
import { Draggable } from 'react-beautiful-dnd';
import { boardService } from '../services/board.service.js';


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
        const value = ev.target.value;
        this.setState({ listTitle: value });
    }

    onSaveListTitle = (ev) => {
        ev.preventDefault();
        this.toggleEditTitle();
        const { listTitle } = this.state;
        if (!listTitle) listTitle = 'Untitled';
        const { onUpdateBoard, board, currListIdx } = this.props;
        board.lists[currListIdx].listTitle = listTitle;
        onUpdateBoard();
    }


    render() {
        const { list, onUpdateBoard, currListIdx } = this.props
        console.log('listidx', currListIdx);
        const { isAdding, isEditTitle, listTitle } = this.state
        return (
            <Draggable draggableId={list.listId} idx={currListIdx}>
                {provided => (
                    <section className="list flex direction-col" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="list-wrapper">
                            <div className="list-header">
                                {!isEditTitle && <h1 onClick={this.toggleEditTitle}>{list.listTitle}</h1>}
                                {isEditTitle &&
                                    <form onSubmit={this.onSaveListTitle}>
                                        <input type="text" value={listTitle} autoFocus onChange={this.handleChange} />
                                    </form>
                                }
                            </div>
                            <CardList key={list.listId} cards={list.cards} onUpdateBoard={onUpdateBoard} list={list} />
                            {!isAdding && <h1 onClick={() => {
                                this.toggleOnAdd()
                            }}>Add a card</h1>}
                            {isAdding && <AddCard list={list} onUpdateBoard={onUpdateBoard} onCloseAdding={this.onCloseAdding} />}
                        </div>
                    </section >
                )}
            </Draggable>

        )
    }
}