import React from 'react';
import { Loading } from './Loading';
import TextareaAutosize from '@mui/material/TextareaAutosize';
export class CardTitle extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        isEdit: false
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSaveTitle()
        }
        else {
            const { currListIdx, currCardIdx } = this.state
            const boardToUpdate = { ...this.state.board }
            boardToUpdate.lists[currListIdx].cards[currCardIdx][ev.target.name] = ev.target.value
            this.setState({ ...this.state, board: boardToUpdate })
        }
    }

    onSaveTitle = () => {
        const { board, currListIdx, currCardIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const action = `changed title`
        const txt = currCard.cardTitle
        this.props.OnUpdateBoard({ ...this.state.board }, action, currCard, txt)
        this.onToggleEdit()
    }

    onToggleEdit = () => {
        this.setState({ ...this.state, isEdit: !this.state.isEdit })
    }

    render() {
        const { board, currListIdx, currCardIdx, isEdit } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (<>
            {isEdit && <TextareaAutosize
                name='cardTitle'
                type='text'
                placeholder='Enter title'
                onChange={this.handleChange}
                onKeyPress={this.handleChange}
                value={currCard.cardTitle}
                onBlur={this.onSaveTitle}
                autoFocus
            />}
            {!isEdit && <h2 onClick={this.onToggleEdit}>{currCard.cardTitle}</h2>}
        </>
        )
    }

}