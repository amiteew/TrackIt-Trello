import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export class DashboardTitle extends React.Component {
  get getTasksCount() {
    const { board } = this.props;
    let tasksCount = 0;
    board.lists.forEach((list) => {
      tasksCount += list.cards.length;
    });
    return tasksCount;
  }

  get getOverdueCount() {
    const { board } = this.props;
    let overdueCount = 0;
    board.lists.forEach((list) => {
      list.cards.forEach((card) => {
        if (
          card.dueDate &&
          !card.dueDate.isDone &&
          card.dueDate.date < Date.now()
        )
          overdueCount++;
      });
    });
    return overdueCount;
  }

  get percentage() {
    return (this.getOverdueCount / this.getTasksCount) * 100;
  }

  render() {
    const { board } = this.props;
    return (
      <div className="dashboard-title">
        <h1 className="title flex align-center justify-center">
          <FolderOpenOutlinedIcon />
          {board.boardTitle}
        </h1>
        <ul className="dashboard-stats clean-list">
          <li>
            <h2>
              <FormatListBulletedIcon />
              {this.getTasksCount} Tasks
            </h2>
          </li>
          <li>
            <h2>
              <PersonOutlineOutlinedIcon />
              {board.boardMembers.length} Members
            </h2>
          </li>
          <li>
            <h2>
              <ErrorOutlineIcon />
              {this.getOverdueCount} Overdue
            </h2>
          </li>
        </ul>
      </div>
    );
  }
}
