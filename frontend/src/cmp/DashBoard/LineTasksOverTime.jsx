import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';

export class LineTasksOverTime extends React.Component {

    get getMapTasksOverTime() {
        const { board } = this.props
        const mainColor = '#45cbb2'
        const doneColor = '#61bd4f';
        const overdueColor = '#eb5a46';
        const backgroundColor = []
        let mapTasksOverTime = {}
        // const data = []

        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (mapTasksOverTime[card.dueDate.date]) {
                    mapTasksOverTime[card.dueDate.date]++
                }
                else {
                    mapTasksOverTime[card.dueDate.date] = 1
                    if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
                        backgroundColor.push(overdueColor)
                    } else if (card.dueDate && card.dueDate.isDone) {
                        backgroundColor.push(doneColor)
                    } else {
                        backgroundColor.push(mainColor)
                    }
                }
            })
        })
        mapTasksOverTime = Object.entries(mapTasksOverTime).sort((a, b) => a[0].localeCompare(b[0]));
        console.log(' mapTasksOverTime', mapTasksOverTime)
        const data = mapTasksOverTime.map(task => ({ x: task[0], y: task[1] }))


        // for (const key in mapTasksOverTime) {
        //     data.push({ x: key, y: mapTasksOverTime[key] })
        // }

        // board.lists.forEach(list => {
        //     list.cards.forEach(card => {
        //         if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
        //             mapTasksOverTime.data.push({ x: card.dueDate.date, y: 1 })
        //             mapTasksOverTime.backgroundColor.push(overdueColor)
        //         } else if (card.dueDate && card.dueDate.isDone) {
        //             mapTasksOverTime.data.push({ x: card.dueDate.date, y: 1 })
        //             mapTasksOverTime.backgroundColor.push(doneColor)
        //         } else {
        //             mapTasksOverTime.data.push({ x: card.dueDate.date, y: 1 })
        //             mapTasksOverTime.backgroundColor.push(mainColor)
        //         }
        //     })
        // })
        console.log('data', data)
        return { data, backgroundColor }
    }

    get getPieData() {
        const mapTasksPerLabel = this.mapTasksPerLabel
        // console.log('tasksPerLabels', mapTasksPerLabel)
        return {
            labels: mapTasksPerLabel.map(taskPerLabel => taskPerLabel.label),
            // labels: board.labels.map((label, idx) => label.title ? label.title : `label${idx + 1} (no title)`),
            datasets: [
                {
                    label: '# of Votes', // WHAT IS IT?
                    data: mapTasksPerLabel.map(taskPerLabel => taskPerLabel.tasks),
                    backgroundColor: [
                        '#61bd4f',
                        '#f2d600',
                        '#ff9f1a',
                        '#eb5a46',
                        '#c377e0',
                        '#5ba4cf',
                        '#51e898',
                        '#2acce5',
                        '#ff8ed4'
                    ],
                    borderColor: [
                        'black'
                    ],
                    borderWidth: .5,
                },
            ],
        }
    }

    render() {
        const mapTasksOverTime = this.getMapTasksOverTime
        console.log('mapTasksOverTime', mapTasksOverTime)
        const test = 'is it working?'
        const data = {
            // labels: ['one', 'two', 'three', 'four', 'five', 'six', 'seven'],
            // datasets: [{
            //     label: 'Tasks',
            //     data: [65, 59, 80, 81, 56, 55, 40],
            //     fill: false,
            //     borderColor: 'rgb(75, 192, 192)',
            //     backgroundColor: ['rgb(75, 192, 192)', '#f2d600',
            //         '#ff9f1a',
            //         '#eb5a46',
            //         '#c377e0',
            //         '#5ba4cf',
            //         '#51e898'],
            //     tension: 0.5,
            //     borderWidth: .8,
            // }]
        };
        // console.log('data', data)
        // if (!data.datasets[0].data.length) return <div>there is no tasks tagged to any labels</div>
        const options = {
            scales: {
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return new Date(value).toString().substring(0, 11);
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // var label = +context.dataset.label || '';
                            return 'Task'
                        }
                    }
                }
            }
        }
        return (
            <div className="pie-task-per-label">
                <h1>Tasks over time</h1>
                {/* <Line data={data} /> */}
                <Scatter data={{
                    datasets: [{
                        label: 'Scatter Dataset',
                        data: mapTasksOverTime.data,
                        backgroundColor: mapTasksOverTime.backgroundColor,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.5,
                        borderWidth: 1.5,
                        showLine: true,
                        pointRadius: 6,
                    }],
                }} options={options} />
            </div>
        )
    }
};
