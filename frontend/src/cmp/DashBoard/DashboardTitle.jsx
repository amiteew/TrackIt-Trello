import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';;
export class DashboardTitle extends React.Component {

    get getTasksCount() {
        const { board } = this.props
        let tasksCount = 0
        board.lists.forEach(list => {
            tasksCount += list.cards.length
        })
        return tasksCount
    }

    render() {
        const { board } = this.props
        return (
            <ul className="dashboard-title clean-list">
                <li><h1><FolderOpenOutlinedIcon />{board.boardTitle}</h1></li>
                <li><h1><FormatListBulletedIcon />{this.getTasksCount} Tasks</h1></li>
                <li><h1><PersonOutlineOutlinedIcon />{board.boardMembers.length} Members</h1></li>
            </ul>
        )
    }
};
