export function CardCheckPreview({ checklists }) {

    function countTasks() {
        const tasksDisplay = checklists.reduce((acc, checklist) => {
            acc['taskCount'] += checklist.tasks.length
            checklist.tasks.forEach(task => {
                if (task.isDone) acc['taskCountDone']++
            })
            return acc;
        }, { taskCount: 0, taskCountDone: 0 })
        return tasksDisplay
    }

    const { taskCount, taskCountDone } = countTasks();
    return (
        <div>
            <p>{ taskCountDone + '/' + taskCount}</p>
        </div>
    )

}