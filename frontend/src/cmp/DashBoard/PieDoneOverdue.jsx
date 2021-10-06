import React from 'react';
import { Pie } from 'react-chartjs-2';

export class PieDoneOverdue extends React.Component {

    getDoneOverdue = () => {
        const { board } = this.props
        const data = [0, 0]
        board.lists.forEach(list => {
            list.cards.forEach(card => {
                if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
                    data[0]++
                } else if (card.dueDate && card.dueDate.isDone) data[1]++
            })
        })
        return data
    }

    getPieData = () => {
        return {
            labels: ['Done', 'Overdue'],
            datasets: [
                {
                    // label: '# of Votes', // WHAT IS IT?
                    data: this.getDoneOverdue(),
                    backgroundColor: [
                        '#61bd4f',
                        '#eb5a46'
                    ],
                    borderColor: [
                        '#61bd4f',
                        '#eb5a46'
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
