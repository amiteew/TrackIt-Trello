import React from 'react';
import { CardList } from './CardList.jsx';
import { AddCard } from './AddCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export class ListPreview extends React.Component {

    state = {
        isAdding: false
    }

    toggleOnAdd = () => {
        this.setState({ isAdding: !this.state.isAdding })
    }
    onCloseAdding = () => {
        this.toggleOnAdd();
    }
    render() {
        const { list, onUpdateBoard } = this.props
        const { isAdding } = this.state
        return (
            <section className="list flex direction-col">
                <div className="list-wrapper">
                    <DragDropContext>
                        <div className="list-header">
                            <h1>{list.listTitle}</h1>
                            <h1></h1>
                        </div>
                        <CardList key={list.id} cards={list.cards} />
                        {!isAdding && <h1 onClick={() => {
                            this.toggleOnAdd()
                        }}>Add a card</h1>}
                        {isAdding && <AddCard list={list} onUpdateBoard={onUpdateBoard} onCloseAdding={this.onCloseAdding} />}
                    </DragDropContext>
                </div>
            </section >

        )
    }
}