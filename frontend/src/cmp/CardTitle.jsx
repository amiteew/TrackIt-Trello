import React from 'react';
import { Loading } from './Loading';

export class CardTitle extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    handleChange = ({ target }) => {
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
        this.setState({ ...this.state, board: boardToUpdate })
    }

    onSaveTitle = (ev) => {
        ev.preventDefault();
        const { board, currListIdx, currCardIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const action = `changed title`
        const txt = currCard.cardTitle
        this.props.OnUpdateBoard({ ...this.state.board }, action, currCard, txt)
    }

    render() {
        const { board, currListIdx, currCardIdx } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <form onSubmit={this.onSaveTitle}>
                <input
                    name='cardTitle'
                    type='text'
                    placeholder='Enter title'
                    onChange={this.handleChange}
                    onBlur={this.onSaveTitle}
                    value={currCard.cardTitle}
                />
            </form>
        )
    }

}