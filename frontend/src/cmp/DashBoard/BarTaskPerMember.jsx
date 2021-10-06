import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

export class BarTaskPerMember extends React.Component {
    componentDidMount() {
        defaults.font.size = 16
        defaults.color = '#fff'
        defaults.plugins.legend.display = false
    }

    get mapTasksPerMember() {
        const { board } = this.props
        let tasksPerMembers = board.boardMembers.map(member => ({ fullname: member.fullname, tasks: 0 }))

        board.lists.forEach(list => {
            tasksPerMembers.forEach(member => {
                list.cards.forEach(card => {
                    if (card.cardMembers.some(cardMember => cardMember.fullname === member.fullname))
                        member.tasks++
                })
            })
        })
        // console.log('tasksPerMembers', tasksPerMembers)
        return tasksPerMembers
    }

    get getPieData() {
        const mapTasksPerMember = this.mapTasksPerMember
        // console.log('mapTasksPerMember', mapTasksPerMember)
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
            responsive: true,
            tooltips: {
                //     bodyFontColor: "#61bd4f",
                //     backgroundColor: "#61bd4f"
                // fontColor: '#fff'
            },
            plugins: {
                legend: {
                    display: false,
                    // position: 'right',
                },
            },
        };
        const data = this.getPieData
        // console.log('data', data)
        return (
            <div className="bar-task-per-member">
                <h1>Tasks per label</h1>
                <Bar data={data} options={options} />
            </div>
        )
    }
};
