import React from 'react';
import { utilService } from '../services/util.service.js';
import { TextareaAutosize } from '@mui/material';


export class AddList extends React.Component {
    state = {
        listTitle: "",
        isAdding: false,
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ listTitle: value });
    }

    onAddList = (ev) => {
        ev.preventDefault();
        const listTitle = this.state.listTitle;
        const newList = {
            listId: utilService.makeId(),
            listTitle
        }
        const { board } = this.props;
        board.lists.push(newList);
        this.setState({ listTitle: "" });
        const action = "added list"
        this.props.onUpdateBoard(action, newList, listTitle);
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
            <div>
                {isAdding && <form onSubmit={this.onAddList} >
                    <TextareaAutosize
                        value={listTitle}
                        aria-label="empty textarea"
                        placeholder="Enter list title"
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                        autoFocus
                    />
                    <button>Add List</button>
                    <button onClick={this.onCloseAdding}>X</button>
                </form>}
                {!isAdding && <h1 onClick={() => {
                    this.toggleOnAdd()
                }}>Add anouther list</h1>}
            </div>
        )
    }
}

