import React from "react";
import { connect } from "react-redux";
import { setNotif, setNotifCount } from "../../store/board.actions";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

class _NotifPopover extends React.Component {
  onNotifClick = (cardId) => {
    const { board } = this.props;
    const list = board.lists.find((list) =>
      list.cards.find((card) => card.cardId === cardId)
    );
    if (!list) this.props.history.push(`/cardNotFound`);
    else
      this.props.history.push(`/boards/${board._id}/${list.listId}/${cardId}`);
    this.props.handleClose();
  };

  render() {
    const { board, notifCount, loggedInUser } = this.props;
    if (!board._id) return <div>Enter a board to see your notifications</div>;
    const notifications = board.activities.filter(
      (activity) =>
        activity.isNotif && activity.byMember._id !== loggedInUser._id
    );
    return (
      <div className="notif-popover fancy-scrollbar flex align-center direction-col">
        {notifications.length ? (
          notifications.map((activity, idx) => (
            <div
              onClick={() => this.onNotifClick(activity.card.cardId)}
              className={`notif-allert ${idx < notifCount ? "unread" : ""}`}
            >
              <div className="notif pointer">
                <div className="notif-content">
                  <div
                    className="notif-card-titles flex direction-col"
                    style={{
                      backgroundImage: `url(${board.boardStyle.small})`,
                    }}
                  >
                    <span className="notif-card-title">
                      <span className="notif-card-txt">
                        {activity.card.cardTitle}
                      </span>
                    </span>
                    <span className="notif-card-board-title">
                      {board.boardTitle}
                    </span>
                  </div>
                  <div className="notif-member-section flex">
                    <Avatar
                      className="notif-avatar flex align-center"
                      alt={activity.byMember.fullname}
                      src={activity.byMember.imgUrl}
                      key={activity.byMember._id}
                    />
                    <span className="notif-member-name">
                      {activity.byMember.fullname}
                    </span>
                  </div>
                  <div className="notif-action-section flex">
                    <div className="notif-action">
                      <span>
                        {activity.action}
                        {activity.action === "Added" ? (
                          loggedInUser.username === activity.txt ? (
                            <span> you</span>
                          ) : (
                            <span> {`  ${activity.txt}`} </span>
                          )
                        ) : activity.action === "Removed" &&
                          loggedInUser.username === activity.txt ? (
                          <span> you</span>
                        ) : (
                          <span> {`  ${activity.txt}`} </span>
                        )}
                      </span>

                      <small className="notif-date">
                        {" "}
                        {new Date(activity.createdAt)
                          .toString()
                          .substring(0, 16)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Sorry... no new notifications to show</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardReducer.board,
    isNotif: state.boardReducer.isNotif,
    loggedInUser: state.userReducer.loggedInUser,
    notifCount: state.boardReducer.notifCount,
  };
}

const mapDispatchToProps = {
  setNotif,
  setNotifCount,
};

const _NotifPopoverWithRouter = withRouter(_NotifPopover);
export const NotifPopover = connect(
  mapStateToProps,
  mapDispatchToProps
)(_NotifPopoverWithRouter);
