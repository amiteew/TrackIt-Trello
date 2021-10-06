import React from 'react';
import { connect } from 'react-redux';
import { loadBoard } from '../store/board.actions.js';
import { PieDoneOverdue } from '../cmp/DashBoard/PieDoneOverdue';
import { PieTasksPerLabel } from '../cmp/DashBoard/PieTasksPerLabel';
class _Dashboard extends React.Component {

    goBack = () => {
        const { board } = this.props
        this.props.history.push(`/boards/${board._id}`);
    }

    getDashboardData = () => {
        const { board } = this.props
        const dashboard = {
            taskCount: 0,
            doneTasks: 0,
            overDue: 0,
            tasksPerList: [],
            tasksPerMembers: board.boardMembers.map(member => ({ fullname: member.fullname, tasks: 0 })),
            tasksPerLabels: board.labels.map((label, idx) => (
                {
                    label: label.title ? label.title : `label${idx + 1} (no title)`,
                    id: label.id,
                    tasks: 0
                }
            ))
        }

        board.lists.forEach(list => {
            dashboard.taskCount += list.cards.length
            dashboard.tasksPerList.push({ list: list.listTitle, tasks: list.cards.length })
            dashboard.tasksPerMembers.forEach(member => {
                list.cards.forEach(card => {
                    if (card.cardMembers.some(cardMember => cardMember.fullname === member.fullname))
                        member.tasks++
                })
            })
            dashboard.tasksPerLabels.forEach(label => {
                list.cards.forEach(card => {
                    if (card.cardLabelIds.some(labelId => labelId === label.id))
                        label.tasks++
                })

            })
            list.cards.forEach(card => {
                if (card.dueDate && !card.dueDate.isDone && (card.dueDate.date < Date.now())) {
                    dashboard.overDue++
                } else if (card.dueDate && card.dueDate.isDone) dashboard.doneTasks++
            })
        })
        return dashboard
    }

    render() {
        const { board } = this.props
        return (
            <section className="dashboard">
                <h1>Dashboard</h1>
                <button onClick={this.goBack}>Go Back</button>
                <PieDoneOverdue board={board} />
                <PieTasksPerLabel board={board} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    loadBoard,
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
