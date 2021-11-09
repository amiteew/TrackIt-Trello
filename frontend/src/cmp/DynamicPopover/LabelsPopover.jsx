import React from "react";
import { connect } from "react-redux";
import {
  loadBoards,
  removeBoard,
  addBoard,
  updateBoard,
  setUpdateLabel,
} from "../../store/board.actions.js";
import DoneIcon from "@mui/icons-material/Done";
import { BsPencil } from "react-icons/bs";
import { TextareaAutosize } from "@mui/material";

class _LabelsPopover extends React.Component {
  state = {
    board: null,
    currListIdx: null,
    currCardIdx: null,
    currLabel: "",
    filteredLabels: [],
    inputTxt: "",
  };

  componentDidMount() {
    const { board, currListIdx, currCardIdx } = this.props;
    this.setState({
      ...this.state,
      board,
      currListIdx,
      currCardIdx,
      filteredLabels: board.labels,
    });
  }

  toggleLabel = (label) => {
    const { currListIdx, currCardIdx } = this.state;
    const newBoard = { ...this.state.board };
    const currCard = newBoard.lists[currListIdx].cards[currCardIdx];
    if (this.isLabelOnCard(currCard, label.id)) {
      const labelIdx = currCard.cardLabelIds.findIndex(
        (cardLabelId) => cardLabelId === label.id
      );
      newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.splice(
        labelIdx,
        1
      );
    } else {
      newBoard.lists[currListIdx].cards[currCardIdx].cardLabelIds.push(
        label.id
      );
    }
    this.props.updateBoard(newBoard);
  };

  isLabelOnCard = (currCard, labelId) => {
    return currCard.cardLabelIds.some((cardLabelId) => cardLabelId === labelId);
  };

  editLabel = (label) => (ev) => {
    ev.stopPropagation();
    const { changeTitle, setUpdateLabel } = this.props;
    setUpdateLabel({ label, isCreat: true });
    changeTitle(true, "Change label", label);
  };

  createLabel = () => {
    this.props.changeTitle(true, "Create label");
  };

  handleChange = ({ target }) => {
    this.setState({ ...this.state, inputTxt: target.value }, () => {
      const filterRegex = new RegExp(this.state.inputTxt, "i");
      this.setState({
        ...this.state,
        filteredLabels: this.props.board.labels.filter((label) =>
          filterRegex.test(label.title)
        ),
      });
    });
  };

  render() {
    const { board, currListIdx, currCardIdx, filteredLabels, inputTxt } =
      this.state;
    const { labelsProps } = this.props;
    if (!board || currCardIdx === null || currListIdx === null) return <></>;
    const currCard = board.lists[currListIdx].cards[currCardIdx];
    return (
      <section className="label-popover">
        {!labelsProps.isCreate && (
          <div>
            <TextareaAutosize
              className="search-labels text-area-auto"
              placeholder="Search labels..."
              type="text"
              onChange={this.handleChange}
              value={inputTxt}
            />
            <h4>Labels</h4>
            {filteredLabels.length ? (
              filteredLabels.map((label) => (
                <div
                  key={label.id}
                  className="edit-label-popover flex"
                  onClick={() => this.toggleLabel(label)}
                >
                  <div className={"edit-label-color " + label.color}>
                    <span>{label.title}</span>
                    {this.isLabelOnCard(currCard, label.id) && <DoneIcon />}
                  </div>
                  <div
                    onClick={this.editLabel(label)}
                    className="edit-label-icon pointer"
                  >
                    <BsPencil />
                  </div>
                </div>
              ))
            ) : (
              <>
                Sorry no results... <br />
                Maybe try to create a new label
              </>
            )}
            <div className="create-label pointer" onClick={this.createLabel}>
              Create a new label
            </div>
          </div>
        )}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardReducer.board,
    labelsProps: state.boardReducer.labelsProps,
  };
}

const mapDispatchToProps = {
  loadBoards,
  removeBoard,
  addBoard,
  updateBoard,
  setUpdateLabel,
};

export const LabelsPopover = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LabelsPopover);
