import {  ListPreview  } from './ListPreview.jsx';

export function ListsList({ groups: lists, onRemoveBoard }) {
    return (
        <section className="group-list flex">
            {lists.map(list => (
                <ListPreview key={list.id} list={list} onRemoveBoard={onRemoveBoard} />
            ))}
        </section>
    )
}