import * as React from "react";
import { connect } from "react-redux";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import { updateBoard } from "../../store/board.actions.js";

class _SingleMemberPopover extends React.Component {
  state = {
    anchorEl: null,
    currListIdx: null,
    currCardIdx: null,
  };
  componentDidMount() {
    const { currListIdx, currCardIdx } = this.props;
    this.setState({ currListIdx, currCardIdx });
  }

  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    this.setState({ anchorEl: null });
    event.stopPropagation();
  };

  removeMember = (member) => (event) => {
    event.stopPropagation();
    const board = this.props.board;
    const { currCard, loggedInUser } = this.props;
    const memberIdx = currCard.cardMembers.findIndex(
      (cardMember) => cardMember._id === member._id
    );
    currCard.cardMembers.splice(memberIdx, 1);
    const action = loggedInUser._id === member._id ? "Left" : "Removed";
    this.props.updateBoard(board, action, currCard, member.username);
  };

  render() {
    const { member } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <div className="single-member-popover">
        <span className="btn-photo-member" onClick={this.handleClick}>
          <Avatar className="card-details-avatar hover" src={member.imgUrl}>
            <p>{member.initials}</p>
          </Avatar>
        </span>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {/* OPEN MODAL */}
          <div className="single-member-popover-header-title flex direction-row">
            <div className="single-member-title flex direction-row">
              <Avatar src={member.imgUrl} className="avatar">
                <p>{member.initials}</p>
              </Avatar>
              <div className="user-name-info">
                <h4 className="fullname">{member.fullname}</h4>
                <p className="username">@{member.username}</p>
                {/* {(loggedInUser && loggedInUser._id === member._id) &&
                                    <Link className="edit-profile" to="/boards"
                                        onClick={this.handleClose}><p>Edit profile info</p></Link>} */}
              </div>
            </div>
            <button className="close-popover" onClick={this.handleClose}>
              X
            </button>
          </div>
          <div className="popover-content-container">
            <div
              className="remove-from-card pointer"
              onClick={this.removeMember(member)}
            >
              Remove from card
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userReducer.loggedInUser,
    board: state.boardReducer.board,
  };
}
const mapDispatchToProps = {
  updateBoard,
};

export const SingleMemberPopover = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SingleMemberPopover);
