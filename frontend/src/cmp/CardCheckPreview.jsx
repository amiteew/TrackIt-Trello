export function CardCheckPreview({ checklists }) {

    function countTodos() {
        console.log(checklists);
        const todosDisplay = checklists.reduce((acc, checklist) => {
            acc['todoCound'] += checklist.tasks 
            checklist.tasks.forEach(task => {
                if (task.isDone) acc['todoCounDone']++
            })
            return acc;
        }, { todoCound: 0, todoCounDone: 0 })
        return todosDisplay
    }

    const { todoCound, todoCounDone } = countTodos();
    return (
        <div>
            <p>hello</p>
            <p>{todoCound / todoCounDone}</p>
        </div>
    )

}