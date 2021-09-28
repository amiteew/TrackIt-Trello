import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { onLogout } from '../../store/user.actions'
import Avatar from '@mui/material/Avatar';

class _UserMenuPopover extends React.Component {
    onLogout = async () => {
        try {
            this.props.onLogout()
            // console.log('userMenu props:', this.props);
            // this.context.router.push('/');
            // this.props.history.push('/')
        } catch (err) {
            console.log('userMenu catch err:', err);
        }
    }

    render() {
        const { loggedInUser } = this.props
        if (!loggedInUser) return (<></>)
        return (
            <div className="user-menu popover-content">
                <div className="user-info flex">
                    <Avatar alt="" src={loggedInUser.imgUrl} className="logged-in-avatar">
                        <p>{loggedInUser.initials}</p>
                    </Avatar>
                    <div className="user-name-info">
                        <p className="fullname">{loggedInUser.fullname}</p>
                        <p className="username">{loggedInUser.username}</p>
                    </div>
                </div>
                <div>
                    <button onClick={this.onLogout}>Logout</button>
                </div>
            </div>
        )
    }
}

// _UserMenuPopover.contextTypes = {
//     router: PropTypes.object.isRequired
//   }

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    onLogout
}

export const UserMenuPopover = connect(mapStateToProps, mapDispatchToProps)(_UserMenuPopover)
