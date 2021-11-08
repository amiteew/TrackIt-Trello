import React from "react";
import { CardList } from "./CardList.jsx";
import { AddCard } from "./AddCard";
import { Draggable } from "react-beautiful-dnd";
import { DynamicPopover } from "./DynamicPopover.jsx";
import { TextareaAutosize } from "@mui/material";
import plus from "../assets/imgs/plus.svg";

export class ListPreview extends React.Component {
  state = {
    isAdding: false,
    listTitle: "",
    isEditTitle: false,
  };

  toggleOnAdd = () => {
    this.setState({ isAdding: !this.state.isAdding });
  };

  onCloseAdding = () => {
    this.toggleOnAdd();
  };

  toggleEditTitle = () => {
    const { list } = this.props;
    this.setState({
      isEditTitle: !this.state.isEditTitle,
      listTitle: list.listTitle,
    });
  };

  handleChange = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.onSaveListTitle();
    }
    const value = ev.target.value;
    this.setState({ listTitle: value });
  };

  onSaveListTitle = () => {
    const { listTitle } = this.state;
    if (!listTitle) return;
    const { onUpdateBoard, board, currListIdx } = this.props;
    board.lists[currListIdx].listTitle = listTitle;
    onUpdateBoard(board);
    this.toggleEditTitle();
  };

  render() {
    const { list, onUpdateBoard, currListIdx, board } = this.props;
    const { isAdding, isEditTitle, listTitle } = this.state;
    return (
      <Draggable draggableId={list.listId} index={currListIdx}>
        {(provided) => (
          <section
            className="list-wrapper"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="list-content flex direction-col">
              <div className="list-header flex">
                {!isEditTitle && (
                  <h2 onClick={this.toggleEditTitle}>{list.listTitle}</h2>
                )}
                {isEditTitle && (
                  <TextareaAutosize
                    className="text-area-auto list-title-input"
                    value={listTitle}
                    aria-label="empty textarea"
                    onChange={this.handleChange}
                    onKeyPress={this.handleChange}
                    onBlur={this.onSaveListTitle}
                    onFocus={(ev) => {
                      ev.target.select();
                    }}
                    autoFocus
                  />
                )}
                <div className="list-header-menu-btn">
                  <DynamicPopover
                    type={"list actions"}
                    board={board}
                    list={list}
                    onUpdateBoard={onUpdateBoard}
                    titleModal={"List actions"}
                  />
                </div>
              </div>
              <div className="list-cards fancy-scrollbar">
                <CardList
                  key={list.listId}
                  cards={list.cards}
                  board={board}
                  currListIdx={currListIdx}
                  list={list}
                  onUpdateBoard={onUpdateBoard}
                />
                {isAdding && (
                  <AddCard
                    list={list}
                    onUpdateBoard={onUpdateBoard}
                    onCloseAdding={this.onCloseAdding}
                  />
                )}
              </div>
              {!isAdding && (
                <span
                  className="add-card-container"
                  onClick={() => {
                    this.toggleOnAdd();
                  }}
                >
                  <img src={plus} alt="" />
                  Add a card
                </span>
              )}
            </div>
          </section>
        )}
      </Draggable>
    );
  }
}
