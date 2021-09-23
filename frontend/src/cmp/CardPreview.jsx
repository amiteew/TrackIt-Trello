import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class CardPreview extends React.Component {

    render() {
        const { card } = this.props
        return (
            <Draggable draggableId={card.cardId} index={this.props.index}>
                {(provided) => (
                    < div className="card-preview-title" {...provided.draggableProps}
                        {...provided.dragHandleProps} innertRef={provided.innerRef}>
                        <h1>{card.cardTitle}</h1>
                    </div>
                )
                }
            </Draggable>

        )
    }
}