import React from "react"
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { TextareaAutosize } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { userService } from '../../services/user.service'
import { updateBoard } from '../../store/board.actions';

class _InvitePopover extends React.Component {
    state = {
        users: [],
        inputTxt: '',
        filteredUsers: []
    }

    async componentDidMount() {
        const users = await userService.getUsers()
        users.sort((u1, u2) => ((u1.fullname).localeCompare(u2.fullname)))
        this.setState({ users, filteredUsers: users })
    }

    handleChange = ({ target }) => {
        this.setState({ ...this.state, inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            const filteredUsers = this.state.users.filter(user => filterRegex.test(user.fullname))
            this.setState({ ...this.state, filteredUsers })
        })
    }

    isMemberInBoard = (userId) => {
        return this.props.board.boardMembers.some(member => member._id === userId)
    }

    addUser = (user) => {
        if (this.isMemberInBoard(user._id)) return
        const newBoard = {...this.props.board}
        newBoard.boardMembers.push(user)
        this.props.updateBoard(newBoard, `invited ${user.fullname} to the board`)
        this.props.handleClose()
    }

    render() {
        const { users, inputTxt, filteredUsers } = this.state
        if (!users.length) return <></>
        return (
            <div className="invite-users">
                <TextareaAutosize
                    className="search-users text-area-auto"
                    placeholder="Search users"
                    type='text'
                    onChange={this.handleChange}
                    value={inputTxt}
                />
                {filteredUsers.map(user => (
                    <button key={user._id} className="user-preview flex align-center space-between " onClick={() => this.addUser(user)} >
                        <span className="flex direction-row ">
                            <Avatar className="avatar" src={user.imgUrl} ><p>{user.initials}</p></Avatar>
                            <span className="name flex align-center">{user.fullname}</span>
                        </span>
                        {this.isMemberInBoard(user._id) && <span><DoneIcon /></span>}
                    </button>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board
    }
}

const mapDispatchToProps = {
    updateBoard
}

export const InvitePopover = connect(mapStateToProps, mapDispatchToProps)(_InvitePopover)