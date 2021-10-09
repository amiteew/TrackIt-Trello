import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { onLogout } from '../../store/user.actions'
import { UserInfo } from '../UserInfo';
import { updateBoard } from '../../store/board.actions'

class _UserMenuPopover extends React.Component {
    onLogout = async () => {
        await this.props.onLogout()
        this.props.history.push('/')
    }

    onRemoveFromBoard = (memberId) => {
        const memberIdx = this.props.board.boardMembers.findIndex(member => member._id === memberId)
        const newBoard = { ...this.props.board }
        newBoard.boardMembers.splice(memberIdx, 1)
        this.props.updateBoard(newBoard, `removed ${this.props.user.fullname} from the board`)
        this.props.handleClose()
    }

    render() {
        const { user, from } = this.props
        if (!user) return (<></>)
        return (
            <div className="user-menu popover-content">
                <UserInfo user={user} handleClose={this.props.handleClose} />
                {(from === 'AppHeader') && <div>
                    <button onClick={this.onLogout}>Logout</button>
                </div>}
                {(from === 'BoardHeader') &&
                    <button className="remove-member-btn" onClick={() => this.onRemoveFromBoard(user._id)}>Remove from board</button>
                }
            </div>
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
    onLogout,
    updateBoard
}

const _UserMenuPopoverWithRouter = withRouter(_UserMenuPopover);
export const UserMenuPopover = connect(mapStateToProps, mapDispatchToProps)(_UserMenuPopoverWithRouter)
