import React from 'react';
import { Bar } from 'react-chartjs-2';

export class BarTaskPerMember extends React.Component {

    get mapTasksPerMember() {
        const { board } = this.props
        const membersMinusGuest = board.boardMembers.filter(member => member.username !== 'pandaguest')
        // let tasksPerMembers = board.boardMembers.map(member => ({ fullname: member.fullname, tasks: 0 }))
        let tasksPerMembers = membersMinusGuest.map(member => ({ fullname: member.fullname, tasks: 0 }))

        board.lists.forEach(list => {
            tasksPerMembers.forEach(member => {
                list.cards.forEach(card => {
                    if (card.cardMembers.some(cardMember => cardMember.fullname === member.fullname))
                        member.tasks++
                })
            })
        })
        return tasksPerMembers
    }

    get getPieData() {
        const mapTasksPerMember = this.mapTasksPerMember
        return {
            labels: mapTasksPerMember.map(taskPerMember => taskPerMember.fullname),
            datasets: [
                {
                    label: 'Tasks',
                    data: mapTasksPerMember.map(taskPerMember => taskPerMember.tasks),
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

        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        };
        const data = this.getPieData
        console.log('data', data)
        if (data.datasets[0].data.length < 2) return (
            <div className="bar-task-per-member no-result">
                <h1>Tasks per member</h1>
                Sorry, not enough data<br />
                to analyze...
            </div>
        )


        return (
            <div className="bar-task-per-member">
                <h1>Tasks per member</h1>
                <Bar height={350} width={200}
                    data={data} options={options} />
            </div>
        )
    }
};
