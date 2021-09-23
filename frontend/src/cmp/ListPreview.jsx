import React from 'react';
import { CardList } from './CardList.jsx';


export class GroupPreview extends React.Component {

    render() {
        const { list } = this.props
        return (
            <section className="group-list flex direction-col">
                <h1>{list.listTitle}</h1>
                <CardList key={list.id} cards={list.cards} />
            </section>
        )
    }
}