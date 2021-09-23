import React from 'react';
import { CardList } from './CardList.jsx';
import {AddCard} from './AddCard';

export class ListPreview extends React.Component {

    render() {
        const { list } = this.props
        return (
            <section className="group-list flex direction-col">
                <h1>{list.listTitle}</h1>
                <CardList key={list.id} cards={list.cards} />
                {/* <AddCard/> */}
            </section>
        )
    }
}