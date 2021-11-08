import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { updateBoard } from "../../store/board.actions.js";
import { utilService } from "../../services/util.service";
class _MoveCopyCardPopoverWithRouter extends React.Component {
  state = {
    listIdx: 0,
    cardIdx: 0,
    title: "",
  };

  componentDidMount() {
    const { currListIdx, currCardIdx, currCard } = this.props;
    this.setState({
      listIdx: currListIdx,
      cardIdx: currCardIdx,
      title: currCard.cardTitle,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onMoveCard = (cardToMove) => {
    const { board } = this.props;
    const { listIdx, cardIdx, title } = this.state;
    const listId = board.lists[listIdx].listId;
    let action;
    board.lists.forEach((list) => {
      list.cards.forEach((boardCard, idx) => {
        if (boardCard.cardId === cardToMove.cardId) list.cards.splice(idx, 1);
      });
      if (list.listId === listId) {
        list.cards.splice(cardIdx, 0, cardToMove);
        action = `Moved card ${title}`;
      } else {
        action = `copied card ${title}`;
      }
    });
    this.props.history.push(`/boards/${board._id}`);
    this.props.updateBoard(board, action, cardToMove);
  };

  onCopyCard = () => {
    const { currCard } = this.props;
    const { title } = this.state;
    if (!title) return;
    const duplicatedCard = JSON.parse(JSON.stringify(currCard));
    duplicatedCard.cardId = utilService.makeId();
    duplicatedCard.cardTitle = this.state.title;
    this.onMoveCard(duplicatedCard);
  };

  render() {
    const { board, isCopy } = this.props;
    const { listIdx, cardIdx, title } = this.state;
    const chosenCards = board.lists[listIdx].cards;
    return (
      <section className="move-copy-card-popover flex direction-col">
        <div className="board-title">
          <h4>Board:</h4>
          <h4>{board.boardTitle}</h4>
        </div>
        {isCopy && (
          <div className="card-title flex direction-col">
            <label htmlFor="title">
              <h4>Title:</h4>
            </label>
            <TextareaAutosize
              id="title"
              name="title"
              className="text-area-auto"
              type="text"
              placeholder="Title"
              onChange={this.handleChange}
              value={title}
              // onBlur={this.onSaveDescription}
              // onFocus={(ev) => ev.target.select()}
              autoFocus
            />
          </div>
        )}
        <h4 className="copy-to">copy to...</h4>
        <div className="list-position flex diirection-row space-between">
          <FormControl variant="standard">
            <InputLabel id="list">List</InputLabel>
            <Select
              label="List"
              labelId="list"
              id="select-list"
              value={listIdx}
              name="listIdx"
              onChange={this.handleChange}
            >
              {board.lists.map((list, idx) => (
                <MenuItem value={idx}>{list.listTitle}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="position">Position</InputLabel>
            <Select
              labelId="position"
              id="select-position"
              value={cardIdx}
              name="cardIdx"
              onChange={this.handleChange}
            >
              {chosenCards.length ? (
                chosenCards.map((card, idx) => (
                  <MenuItem value={idx}>{idx ? idx + 1 : 1}</MenuItem>
                ))
              ) : (
                <MenuItem value={0}>1</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        {!isCopy && (
          <button onClick={() => this.onMoveCard(this.props.currCard)}>
            Move
          </button>
        )}
        {isCopy && <button onClick={this.onCopyCard}>Create card</button>}
      </section>
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
const _MoveCopyCardPopover = withRouter(_MoveCopyCardPopoverWithRouter);
export const MoveCopyCardPopover = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MoveCopyCardPopover);
