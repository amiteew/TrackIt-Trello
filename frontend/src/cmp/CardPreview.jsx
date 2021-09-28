import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { QuickCardEditor } from './QuickCardEditor.jsx';


export class CardPreview extends React.Component {

    handleDnd = () => {
        console.log('is dragging', this.props.draggingOver);
    }
    render() {
        const { card, board, currCardIdx, currListIdx, list } = this.props
        return (
            <Draggable draggableId={card.cardId} index={currCardIdx}>
                {(provided, snapshot) => (
                    <div className="card-preview-contenet" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isdraggingover={snapshot.draggingOver}>
                        <Link className="flex" to={`/boards/${board._id}/${list.listId}/${card.cardId}`}>
                            <QuickCardEditor card={card} board={board} currListIdx={currListIdx} currCardIdx={currCardIdx} />
                        </Link>
                    </div>
                )
                }
            </Draggable>

        )
    }
}
