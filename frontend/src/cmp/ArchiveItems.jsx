import React from "react";
import { QuickCardEditor } from "./QuickCardEditor.jsx";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateBoard } from "../store/board.actions.js";

export class _ArchiveItems extends React.Component {
  state = {
    searchKey: "",
  };

  handleChange = (ev) => {
    const value = ev.target.value;
    this.setState({ searchKey: value });
  };

  onFilterCards = () => {
    const { board } = this.props;
    const regex = new RegExp(this.state.searchKey, "i");
    regex.test(board);
  };
  onSelectedCard = (list, card) => {
    const { board, toggleMenu } = this.props;
    toggleMenu();
    this.props.history.push(
      `/boards/${board._id}/${list.listId}/${card.cardId}`
    );
  };

  onDeleteCard = (listIdx, cardIdx, card) => (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const { board, updateBoard, toggleMenu } = this.props;
    toggleMenu();
    board.lists[listIdx].cards.splice(cardIdx, 1);
    updateBoard({ ...board }, "Deleted card", card.tilte);
  };

  onSendToBoard = (card) => (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    const { board, updateBoard, toggleMenu } = this.props;
    toggleMenu();
    card.isArchived = false;
    updateBoard({ ...board });
  };

  render() {
    const { board } = this.props;
    return (
      <div>
        {board.lists.map((list, listIdx) =>
          list.cards.map(
            (card, cardIdx) =>
              card.isArchived && (
                <div
                  className="archived-list"
                  onClick={() => {
                    this.onSelectedCard(list, card);
                  }}
                >
                  <QuickCardEditor
                    card={card}
                    currListIdx={listIdx}
                    currCardIdx={cardIdx}
                  />
                  <div className="archive-actions flex">
                    <p
                      className="send-to-board pointer"
                      onClick={this.onSendToBoard(card)}
                    >
                      Send to board{" "}
                    </p>
                    <span className="space">-</span>
                    <p
                      className="delete-card pointer"
                      onClick={this.onDeleteCard(listIdx, cardIdx, card)}
                    >
                      {" "}
                      Delete
                    </p>
                  </div>
                </div>
              )
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardReducer.board,
    loggedInUser: state.userReducer.loggedInUser,
  };
}
const mapDispatchToProps = {
  updateBoard,
};
const _ArchiveItemsWithRouter = withRouter(_ArchiveItems);
export const ArchiveItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArchiveItemsWithRouter);
