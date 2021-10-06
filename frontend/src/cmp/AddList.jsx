import React from 'react';
import { utilService } from '../services/util.service.js';
import { TextareaAutosize } from '@mui/material';
import { Button } from '@mui/material';
import close from '../assets/imgs/close.svg';
import AddIcon from '@mui/icons-material/Add';
import plus from '../assets/imgs/icons/plus-white.svg';
export class AddList extends React.Component {
    state = {
        listTitle: "",
        isAdding: false
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
        const action = `Added list ${listTitle}`
        this.setState({ listTitle: "" });
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
        const addMode = isAdding ? 'add-mode' : '';
        return (
            <div onClick={this.toggleOnAdd} className={'add-list board-btn flex align-center pointer ' + addMode}>
               {isAdding &&  <form onSubmit={this.onAddList} >
                    <TextareaAutosize className="text-area-auto list-input"
                        value={listTitle}
                        aria-label="empty textarea"
                        placeholder="Enter list title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleChange}
                        onBlur={this.onAddList}
                        autoFocus
                    />
                    <div className="add-list-actions flex align-center">
                        <Button className="add-list-btn">Add List</Button>
                        <span className="close-add-list-btn" onClick={this.onCloseAdding}><img src={close} alt="close" /></span>
                    </div>
                </form>}
                {!isAdding && <span className="plus flex align-center" onClick={() => {
                    this.toggleOnAdd()
                }}> <img src={plus} alt="plus" /><span className="add-list-txt">Add another list</span></span>}
               
            </div>
        )
    }
}

