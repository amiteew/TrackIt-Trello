import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
export class DashboardTitle extends React.Component {

    get getTasksCount() {
        const { board } = this.props
        let tasksCount = 0
        board.lists.forEach(list => {
            tasksCount += list.cards.length
        })
        return tasksCount
    }

    get getOverdueCount() {
        const { board } = this.props
        const overdueCount = 0
        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now()))
                    overdueCount++
            })
        })
        return overdueCount
    }

    // get presen


    render() {
        const { board } = this.props
        const percentage = 50
        return (<div>
            <h1><FolderOpenOutlinedIcon />{board.boardTitle}</h1>
            <ul className="dashboard-title clean-list">
                <li><h1><FormatListBulletedIcon />{this.getTasksCount} Tasks</h1></li>
                <li><h1></h1>{this.getVerdueCount} Overdue</li>
                <li><h1><PersonOutlineOutlinedIcon />{board.boardMembers.length} Members</h1></li>
            </ul>
            <div>
                <h1>Overdue</h1>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textColor: "white",
                        pathColor: '#0079bf',
                        trailColor: "white",
                        textSize: "18px",
                        // text: {
                        //     fill: '#ffffff',
                        //     fontSize: '25px',
                        // },
                    })}
                />
            </div>
        </div >
        )
    }
}
