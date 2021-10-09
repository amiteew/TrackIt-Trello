import React from 'react';
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";

export class ProgressbarDone extends React.Component {

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
        let overdueCount = 0
        let doneCount = 0
        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now()))
                    overdueCount++
                else if (card.dueDate && card.dueDate.isDone)
                    doneCount++
            })
        })
        return { overdueCount, doneCount }
    }

    get percentageDone() {
        return (this.getOverdueCount.doneCount / this.getTasksCount) * 100
    }

    render() {
        return (
            <div className="progress-bar-done" >
                <h1>Done Tasks</h1>
                <div className="progress-bar">
                    <CircularProgressbarWithChildren
                        className="circularProgressbar"
                        value={this.percentageDone}
                        styles={buildStyles({
                            pathColor: '#61bd4fb1',
                            trailColor: "#ffffffee",
                        })}
                    >
                        <div className="text-done">
                            {this.percentageDone.toFixed()}% Done
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
            </div >
        )
    }
};
