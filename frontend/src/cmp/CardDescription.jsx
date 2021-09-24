import React from 'react';
import { Loading } from './Loading';

export class CardDescription extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        isEditing: false
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }
    onToggleEditing = () => {
        this.setState({ ...this.state, isEditing: true })
    }

    handleChange = ({ target }) => {
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
        this.setState({ ...this.state, board: boardToUpdate })
    }

    onSaveTitle = (ev) => {
        ev.preventDefault();
        ev.stopPropagation()
        const { board, currListIdx, currCardIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const action = `Changed description`
        const txt = currCard.description
        this.props.OnUpdateBoard({ ...this.state.board }, action, currCard, txt)
        this.setState({ ...this.state, isEditing: false })
    }

    render() {
        const { board, currListIdx, currCardIdx, isEditing } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (<div >
            <h3>Description</h3>
            <div onClick={this.onToggleEditing}>
                <form onSubmit={this.onSaveTitle} >
                    <input
                        name='description'
                        type='text'
                        placeholder='Enter title'
                        onChange={this.handleChange}
                        value={currCard.description}
                    />
                    {isEditing && <button onClick={this.onSaveTitle}>Save</button>}
                </form>
            </div>
        </div>
        )
    }

}