import React from 'react';
import { Pie } from 'react-chartjs-2';

export class PieDoneOverdue extends React.Component {

    get getValuesDoneOverdue() {
        const { board } = this.props
        const data = [0, 0]
        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
                    data[1]++
                } else if (card.dueDate && card.dueDate.isDone) data[0]++
            })
        })
        return data
    }

    get getPieData() {
        return {
            labels: ['Done', 'Overdue'],
            datasets: [
                {
                    // label: '# of Votes', // WHAT IS IT?
                    data: this.getValuesDoneOverdue,
                    backgroundColor: [
                        '#45cbb2',
                        '#0079bf'
                    ],
                    borderColor: [
                        'black',
                    ],
                    borderWidth: .5,
                },
            ],
        }
    }

    render() {
        const data = this.getPieData
        return (
            <div className="pie-done-overdue">
                <h1>Done Vs. Overdue</h1>
                <Pie data={data} />
            </div>
        )
    }
};
