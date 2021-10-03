import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { updateBoard } from '../../store/board.actions.js';
import { utilService } from '../../services/util.service';
class _MoveCopyCardPopoverWithRouter extends React.Component {

    state = {
        listIdx: 0,
        cardIdx: 0,
        title: '',
    }

    componentDidMount() {
        const { currListIdx, currCardIdx, currCard, isCopy } = this.props
        this.setState({ listIdx: currListIdx, cardIdx: currCardIdx, title: currCard.cardTitle })
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    onMoveCard = (cardToMove) => {
        const { board } = this.props
        const { listIdx, cardIdx, title } = this.state
        const listId = board.lists[listIdx].listId
        board.lists.forEach(list => {
            list.cards.forEach((boardCard, idx) => {
                if (boardCard.cardId === cardToMove.cardId) list.cards.splice(idx, 1)
            })
            if (list.listId === listId) list.cards.splice(cardIdx, 0, cardToMove)
        })
        this.props.history.push(`/boards/${board._id}`)
        this.props.updateBoard(board, `Move Card ${title}`, cardToMove)
    }

    onCopyCard = () => {
        const { currCard } = this.props
        const { title } = this.state
        if (!title) return
        const duplicatedCard = JSON.parse(JSON.stringify(currCard))
        duplicatedCard.cardId = utilService.makeId()
        duplicatedCard.cardTitle = this.state.title
        this.onMoveCard(duplicatedCard)
    }

    render() {
        const { board, isCopy } = this.props
        const { listIdx, cardIdx, title } = this.state
        const chosenCards = board.lists[listIdx].cards
        return (
            <section className="move-copy-card-popover">
                <div className="board-title">
                    <h5>Board</h5>
                    {board.boardTitle}
                </div>
                {
                    isCopy &&
                    <TextareaAutosize
                        name='title'
                        className="text-area-auto "
                        type='text'
                        placeholder='Title'
                        onChange={this.handleChange}
                        value={title}
                        // onBlur={this.onSaveDescription}
                        // onFocus={(ev) => ev.target.select()}
                        autoFocus
                    />
                }

                <FormControl variant="standard" >
                    <InputLabel id="demo-simple-select-label">List</InputLabel>
                    <Select
                        label="List"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-filled"
                        value={listIdx}
                        name="listIdx"
                        onChange={this.handleChange}
                    >
                        {board.lists.map((list, idx) => (<MenuItem value={idx}>{list.listTitle}</MenuItem>))}
                    </Select>
                </FormControl>

                <FormControl variant="filled" >
                    <InputLabel id="demo-simple-select-filled-label">Position</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={cardIdx}
                        name="cardIdx"
                        onChange={this.handleChange}
                    >
                        {chosenCards.length ?
                            chosenCards.map((card, idx) => <MenuItem value={idx}>{idx ? idx + 1 : 1}</MenuItem>)
                            :
                            <MenuItem value={0}>1</MenuItem>}
                    </Select>
                </FormControl>

                {!isCopy && <button onClick={() => this.onMoveCard(this.props.currCard)}>Move</button>}
                {isCopy && <button onClick={this.onCopyCard}>Create card</button>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    updateBoard
}
const _MoveCopyCardPopover = withRouter(_MoveCopyCardPopoverWithRouter);
export const MoveCopyCardPopover = connect(mapStateToProps, mapDispatchToProps)(_MoveCopyCardPopover)