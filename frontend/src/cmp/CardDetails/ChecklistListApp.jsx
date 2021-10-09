import React from 'react'
import { ChecklistApp } from './ChecklistApp'

export function ChecklistListApp({ currCard }) {
    const checklists = currCard.checklists
    return (
        <>
            {checklists.map((checklist, checklistIdx) => <ChecklistApp key={checklist.checklistId}
                currCard={currCard}
                checklistIdx={checklistIdx}
            />)}
        </>
    )
}