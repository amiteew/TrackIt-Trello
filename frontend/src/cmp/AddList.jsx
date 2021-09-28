import React from 'react';
import { utilService } from '../services/util.service.js';
import { TextareaAutosize } from '@mui/material';


export class AddList extends React.Component {
    state = {
        listTitle: "",
        isAdding: false,
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddList();
            return;
        }
        const value = ev.target.value;
        this.setState({ listTitle: value });
    }

    onAddList = () => {
        const listTitle = this.state.listTitle;
        if (!listTitle) {
            this.onCloseAdding()
            return
        }
        const newList = {
            listId: utilService.makeId(),
            listTitle,
            cards: []
        }
        const { board } = this.props;
        board.lists.push(newList);
        this.setState({ listTitle: "" });
        const action = `Added list "${listTitle}"`
        this.props.onUpdateBoard(action);
        this.onCloseAdding();
    }

    toggleOnAdd = () => {
        this.setState({ isAdding: !this.state.isAdding })
    }

    onCloseAdding = () => {
        this.toggleOnAdd();
    }

    render() {
        const { listTitle, isAdding } = this.state;
        return (
            <div className="add-list">
                {isAdding && <form onSubmit={this.onAddList} >
                    <TextareaAutosize className="text-area-auto list-input"
                        value={listTitle}
                        aria-label="empty textarea"
                        placeholder="Enter list title"
                        style={{ width: 100 }}
                        onChange={this.handleChange}
                        onKeyPress={this.handleChange}
                        onBlur={this.onAddList}
                        autoFocus
                    />
                    <button>Add List</button>
                    <button onClick={this.onCloseAdding}>X</button>
                </form>}
                {!isAdding && <span onClick={() => {
                    this.toggleOnAdd()
                }}>Add another list</span>}
            </div>
        )
    }
}

