import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

class _UserInfo extends React.Component {
    closePopover = () => {
        this.props.handleClose()
    }
    
    render() {
        const {user, loggedInUser} = this.props
        return (
            <div className="user-info flex">
                <Avatar alt="" src={user.imgUrl} className="user-avatar">
                    <p>{user.initials}</p>
                </Avatar>
                <div className="user-name-info">
                    <p className="fullname">{user.fullname}</p>
                    <p className="username">{user.username}</p>
                    {/* {(loggedInUser._id === user._id) && <span className="edit-profile" onClick={this.onEditProfile}>Edit profile info</span>} */}
                    {(loggedInUser._id === user._id) && <Link className="edit-profile" to="/boards" onClick={this.closePopover}>Edit profile info</Link>}
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

const _UserInfoWithRouter = withRouter(_UserInfo);
export const UserInfo = connect(mapStateToProps)(_UserInfoWithRouter)