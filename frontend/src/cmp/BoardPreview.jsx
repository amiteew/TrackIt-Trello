import React from 'react'

export class BoardPreview extends React.Component {

    render() {
        return (
            <div className="board-preview" onClick={this.loadBoard}>
                <h3>{board.boardTitle}</h3>
            </div>
        )
    }
}