import React from 'react'

export function ProgressBar({ currChecklist }) {
    const style = { width: getProgress() }
    const precent = getProgress()
    const classNameBar = (precent === '100%') ? 'progress-bar bar-done' : 'progress-bar'

    function getProgress() {
        if (!currChecklist.tasks.length) return '0%'
        let doneCount = 0
        currChecklist.tasks.forEach(task => {
            if (task.isDone) doneCount++
        })
        return `${Math.floor(doneCount / (currChecklist.tasks.length) * 100)}%`
    }

    return (
        <div className="progress-bar">
            <p>{precent}</p>
            <div className="progress-bar-container">
                <div className={classNameBar} style={style} ></div>
            </div>
        </div >
    )
}