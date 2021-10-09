import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import { TextareaAutosize } from '@mui/material';
class _MembersPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        inputTxt: '',
        filteredMembers: []
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ ...this.state, board, currListIdx, currCardIdx, filteredMembers: board.boardMembers })
    }

    toggleMember = (member) => {
        const { currListIdx, currCardIdx } = this.state
        const { loggedInUser, board } = this.props
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        if (this.isMemberOnCard(currCard, member._id)) {
            const memberIdx = currCard.cardMembers.findIndex(cardMember => cardMember._id === member._id)
            currCard.cardMembers.splice(memberIdx, 1)
            var action = (loggedInUser._id === member._id) ? 'Left' : `Removed`
        } else {
            currCard.cardMembers.push(member)
            var action = (loggedInUser._id === member._id) ? 'Join' : `Added`
        }
        this.props.updateBoard(board, action, currCard)
    }

    isMemberOnCard = (currCard, memberId) => {
        return (currCard.cardMembers.some(cardMember => cardMember._id === memberId))
    }

    handleChange = ({ target }) => {
        this.setState({ ...this.state, inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ ...this.state, filteredMembers: this.props.board.boardMembers.filter(member => filterRegex.test(member.fullname)) })
        })
    }

    render() {
        const { board, currListIdx, currCardIdx, filteredMembers, inputTxt } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <section className="members-popover">
                <TextareaAutosize
                    className="search-members text-area-auto"
                    placeholder="Search members"
                    type='text'
                    onChange={this.handleChange}
                    value={inputTxt}
                />
                <h3>Board Members</h3>
                {filteredMembers.length ?
                    (filteredMembers.map(member => {
                        if (member.username === 'pandaguest') return
                        return <div className="member-preview flex direction-row space-between " onClick={() => this.toggleMember(member)} >
                            <div className="flex direction-row ">
                                <Avatar className="card-details-avatar" alt={member.fullname} src={member.imgUrl}
                                    key={member._id} />
                                <div className="flex align-center">{member.fullname} ({member.username})</div>
                            </div>
                            {this.isMemberOnCard(currCard, member._id) && <DoneIcon />}
                        </div>
                    }))
                    : <>Looks like that person isn't a member yet. <br />
                        Enter their email address to <br />
                        add them to the card and board.</>}
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

export const MembersPopover = connect(mapStateToProps, mapDispatchToProps)(_MembersPopover)