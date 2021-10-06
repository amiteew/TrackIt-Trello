import React from 'react';
import { Bar } from 'react-chartjs-2';

export class BarTaskPerList extends React.Component {

    get getMapTasksPerList() {
        const { board } = this.props
        const tasksPerList = []
        board.lists.forEach(list => {
            tasksPerList.push({ list: list.listTitle, tasks: list.cards.length })
        })
        // console.log('tasksPerList', tasksPerList)
        return tasksPerList
    }

    get getBarData() {
        const mapTasksPerList = this.getMapTasksPerList
        // console.log('mapTasksPerList', mapTasksPerList)
        return {
            labels: mapTasksPerList.map(taskPerList => taskPerList.list),
            datasets: [
                {
                    label: 'Tasks',
                    data: mapTasksPerList.map(taskPerList => taskPerList.tasks),
                    backgroundColor: [
                        '#45cbb2',
                        '#0079bf'
                    ],
                    borderColor: [
                        '#45cbb2',
                        '#0079bf'
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }

    render() {
        const data = this.getBarData
        // console.log('data', data)
        return (
            <div className="bar-task-per-list">
                <h1>Tasks per list</h1>
                <Bar data={data} />
            </div>
        )
    }
};
