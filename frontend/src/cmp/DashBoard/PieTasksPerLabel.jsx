import React from 'react';
import { Pie } from 'react-chartjs-2';

export class PieTasksPerLabel extends React.Component {

    mapTasksPerLabel = () => {
        const { board } = this.props
        const mapTasksPerLabel = board.labels.map((label, idx) => (
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
        console.log('mapTasksPerLabel', mapTasksPerLabel)
        return mapTasksPerLabel
    }

    getPieData = () => {
        const mapTasksPerLabel = this.mapTasksPerLabel()
        console.log('tasksPerLabels', mapTasksPerLabel)
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
                    borderWidth: 1,
                },
            ],
        }
    }

    render() {
        const data = this.getPieData()
        return (
            <>
                <Pie data={data} />
            </>
        )
    }
};
