import React from 'react';
import { Loading } from '../Loading';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

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
        this.props.OnUpdateBoard({ ...this.state.board })
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
            <div className="card-details-title flex direction-row">

                <CreditCardOutlinedIcon className="card-details-icon" />
                <div className="flex direction-col">
                    {isEdit && <TextareaAutosize
                        className="text-area-auto"
                        name='cardTitle'
                        type='text'
                        placeholder='Enter title'
                        onChange={this.handleChange}
                        onKeyPress={this.handleChange}
                        value={currCard.cardTitle}
                        onBlur={this.onSaveTitle}
                        onFocus={(ev) => ev.target.select()}
                        autoFocus
                    />}
                    {!isEdit && <h2 onClick={this.onToggleEdit}>{currCard.cardTitle}</h2>}
                    <small>in list <span>{board.lists[currListIdx].listTitle}</span></small>
                </div>
            </div>
        </>
        )
    }

}