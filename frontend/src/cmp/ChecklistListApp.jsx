import React from 'react'
import { ChecklistApp } from './ChecklistApp'
export function ChecklistListApp({ board, currListIdx, currCardIdx, OnUpdateBoard }) {
    const checklists = board.lists[currListIdx].cards[currCardIdx].checklists
    console.log('checklists', checklists);
    return (
        <>
            {checklists.map((checklist, checklistIdx) => <ChecklistApp key={checklist.checklistId} board={board}
                currListIdx={currListIdx} currCardIdx={currCardIdx} checklistIdx={checklistIdx}
                OnUpdateBoard={OnUpdateBoard}
            />)}
        </>
    )
}