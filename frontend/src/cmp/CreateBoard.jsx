import React from 'react';
import CloseIcon from '../assets/imgs/icons/close-icon.svg'
import CheckedIcon from '../assets/imgs/icons/checked-icon.svg'

export class CreateBoard extends React.Component {
    state = {
        title: '',
        bgStyle: null
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ title: value })
    }

    createBoard = () => {
        const { title, bgStyle } = this.state
        if (!title) return
        console.log('create board:', title, bgStyle);
    }

    render() {
        const { title, bgStyle } = this.state
        return (
            <div className="create-board-wrapper">
                <div className="screen" onClick={this.props.onToggleCreateBoard}></div>
                <div className="create-board flex direction-col align-center">
                    <div className="board-preview flex">
                        <div className="title">
                            <form onSubmit={this.createBoard}>
                                <input type="text"
                                    className="title-input"
                                    name="title"
                                    placeholder="Add board title"
                                    value={title}
                                    onChange={this.handleChange}
                                />
                            </form>
                        </div>
                        <div className="choose-bg">

                        </div>
                    </div>
                    <button className={`create-btn${!title ? " disabled" : ""}`} onClick={this.createBoard}>Create board</button>
                </div>
            </div>
        )
    }
}
