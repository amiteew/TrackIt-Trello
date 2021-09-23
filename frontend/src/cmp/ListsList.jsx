import { ListPreview } from './ListPreview.jsx';

export function ListsList({ lists, onUpdateBoard }) {

    return (
        <section className="lists-list flex">
            {lists.map(list => (
                <ListPreview key={list.listId} list={list} onUpdateBoard={onUpdateBoard} />
            ))}
        </section>
    )
}