import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';

function _UserInfo(props) {
    const closePopover = () => {
        props.handleClose()
    }
    const { user } = props

    return (
        <div className="user-info flex">
            <Avatar alt="" src={user.imgUrl} className="user-avatar">
                <p>{user.initials}</p>
            </Avatar>
            <div className="user-name-info">
                <p className="fullname">{user.fullname}</p>
                <p className="username">{user.username}</p>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const UserInfo = connect(mapStateToProps)(_UserInfo)