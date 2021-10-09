import React from 'react';
import { Bar } from 'react-chartjs-2';

export class BarTaskPerList extends React.Component {

    get getMapTasksPerList() {
        const { board } = this.props
        const tasksPerList = []
        board.lists.forEach(list => {
            tasksPerList.push({ list: list.listTitle, tasks: list.cards.length })
        })
        return tasksPerList
    }

    get getBarData() {
        const mapTasksPerList = this.getMapTasksPerList
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
        return (
            <div className="bar-task-per-list">
                <h1>Tasks per list</h1>
                <Bar data={data}
                    height={200}
                    width={350}
                    options={{
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 1
                                }
                            }
                        },
                        legend: {
                            display: false,
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    }} />
            </div>
        )
    }
};
