import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { onLogout } from '../../store/user.actions'
import { UserInfo } from '../UserInfo';

class _UserMenuPopover extends React.Component {
    onLogout = async () => {
        await this.props.onLogout()
        this.props.history.push('/')
    }

    render() {
        const { loggedInUser, onArchive } = this.props
        if (!loggedInUser) return (<></>)
        return (
            <div className="user-menu popover-content">
                <UserInfo user={loggedInUser} handleClose={this.props.handleClose} />
                <div>
                    <button onClick={this.onLogout}>Logout</button>
                    <button onClick={onArchive}>Remove from card</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    onLogout
}

const _UserMenuPopoverWithRouter = withRouter(_UserMenuPopover);
export const UserMenuPopover = connect(mapStateToProps, mapDispatchToProps)(_UserMenuPopoverWithRouter)
