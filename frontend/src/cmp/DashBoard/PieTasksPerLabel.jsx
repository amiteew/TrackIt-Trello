// import React from 'react';
// import { Pie } from 'react-chartjs-2';

// export class PieTasksPerLabel extends React.Component {

//     getDoneOverdue = () => {
//         const { board } = this.props
//         const tasksPerLabels = board.labels.map((label, idx) => (
//             {
//                 label: label.title ? label.title : `label${idx + 1} (no title)`,
//                 id: label.id,
//                 tasks: 0
//             }
//         ))

//         dashboard.tasksPerLabels.forEach(label => {
//             list.cards.forEach(card => {
//                 if (card.cardLabelIds.some(labelId => labelId === label.id))
//                     label.tasks++
//             })

//         })


//         return data
//     }

//     getPieData = () => {
//         return {
//             labels: board.labels.map((label, idx) => label.title ? label.title : `label${idx + 1} (no title)`),
//             datasets: [
//                 {
//                     label: '# of Votes', // WHAT IS IT?
//                     data: this.getDoneOverdue(),
//                     backgroundColor: [
//                         '#61bd4f',
//                         '#eb5a46'
//                     ],
//                     borderColor: [
//                         '#61bd4f',
//                         '#eb5a46'
//                     ],
//                     borderWidth: 1,
//                 },
//             ],
//         }
//     }

//     render() {
//         const data = this.getPieData()
//         return (
//             <>
//                 <Pie data={data} />
//             </>
//         )
//     }
// };
