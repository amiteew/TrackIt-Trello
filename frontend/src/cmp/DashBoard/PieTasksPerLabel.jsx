import React from 'react';
import { Pie } from 'react-chartjs-2';

export class PieTasksPerLabel extends React.Component {

    get mapTasksPerLabel() {
        const { board } = this.props
        let mapTasksPerLabel = board.labels.map((label, idx) => (
            {
                label: label.title ? label.title : `label${idx + 1} (no title)`,
                id: label.id,
                tasks: 0
            }
        ))

        board.lists.forEach(list => {
            mapTasksPerLabel.forEach(taskPerLabel => {
                list.cards.forEach(card => {
                    if (card.cardLabelIds.some(labelId => labelId === taskPerLabel.id))
                        taskPerLabel.tasks++
                })

            })
        })
        mapTasksPerLabel = mapTasksPerLabel.filter(taskPerLabel => taskPerLabel.tasks !== 0)
        return mapTasksPerLabel
    }

    get getPieData() {
        const mapTasksPerLabel = this.mapTasksPerLabel
        return {
            labels: mapTasksPerLabel.map(taskPerLabel => taskPerLabel.label),
            datasets: [
                {
                    label: '# of Votes', // WHAT IS IT?
                    data: mapTasksPerLabel.map(taskPerLabel => taskPerLabel.tasks),
                    backgroundColor: [
                        '#61bd4fb1',
                        '#f2d600b1',
                        '#ff9f1ab1',
                        '#eb5a46b1',
                        '#c377e0b1',
                        '#5ba4cfb1',
                        '#51e898b1',
                        '#2acce5b1',
                        '#ff8ed4b1'
                    ],
                    borderColor: [
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
                    borderWidth: .5,
                },
            ],
        }
    }

    render() {
        const data = this.getPieData
        if (!data.datasets[0].data.length) return (
            <div className="pie-task-per-label no-result">
                <h1>Tasks per label</h1>
                Sorry, there is no tasks <br />
                tagged to any labels...
            </div>
        )
        return (
            <div className="pie-task-per-label">
                <h1>Tasks per label</h1>
                <Pie data={data} height={10} width={10} />
            </div>
        )
    }
};
