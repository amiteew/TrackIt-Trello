import {  GroupPreview  } from './ListPreview.jsx';

export function GroupList({ groups: lists, onRemoveBoard }) {
    return (
        <section className="group-list flex">
            {lists.map(list => (
                <GroupPreview key={list.id} list={list} onRemoveBoard={onRemoveBoard} />
            ))}
        </section>
    )
}