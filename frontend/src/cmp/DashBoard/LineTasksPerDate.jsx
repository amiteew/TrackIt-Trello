import React from 'react';
import { Scatter } from 'react-chartjs-2';

export class LineTasksPerDate extends React.Component {

    get getMapTasksOverTime() {
        const { board } = this.props
        const mainColor = '#45cbb2'
        const overdueColor = '#eb5a46';
        let mapTasksOverTime = {}

        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.dueDate.date) {
                    if (mapTasksOverTime[card.dueDate.date]) {
                        mapTasksOverTime[card.dueDate.date].count++
                    }
                    else {
                        mapTasksOverTime[card.dueDate.date] = { count: 1, color: mainColor }
                    }
                    if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
                        mapTasksOverTime[card.dueDate.date].color = overdueColor
                    }
                }
            })
        })
        mapTasksOverTime = Object.entries(mapTasksOverTime).sort((a, b) => a[0].localeCompare(b[0]));
        const data = mapTasksOverTime.map(task => ({ x: task[0], y: task[1].count }))
        const background = mapTasksOverTime.map(task => task[1].color)
        return { data, background }
    }

    render() {
        const mapTasksOverTime = this.getMapTasksOverTime
        if (!mapTasksOverTime.data.length) return (
            <div className="line-tasks-over-time no-result">
                <h1>Tasks over time</h1>
                Sorry, not enough data to analyze.. <br />
                try add more tasks
            </div>
        )

        return (
            <div className="line-tasks-over-time">
                <h1>Tasks per date</h1>
                <Scatter
                    height={200}
                    width={300}
                    data={{
                        datasets: [{
                            data: mapTasksOverTime.data,
                            backgroundColor: mapTasksOverTime.background,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.5,
                            borderWidth: 1.5,
                            showLine: true,
                            pointRadius: 6,
                        }],
                    }}
                    options={{
                        scales: {
                            x: {
                                ticks: {
                                    callback: function (value, index, values) {
                                        return new Date(value).toString().substring(4, 11);
                                    }
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                },
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: () => 'Task'
                                }
                            }
                        }
                    }}
                />
            </div>
        )
    }
};

