import * as React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DateFnsUtils from '@date-io/date-fns';
import Avatar from '@mui/material/Avatar';
import { UserInfo } from '../UserInfo';
class _SingleMemberPopover extends React.Component {
    state = {
        anchorEl: null,
    }

    handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation()
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null })
        event.stopPropagation()
    };


    render() {
        const { type, title, titleModal, user, loggedInUser } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            <React.Fragment>
                <button className="btn-photo-member" onClick={this.handleClick}>
                    <Avatar className="card-details-avatar hover" alt={user.fullname} src={user.imgUrl} />
                </button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    {/* OPEN MODAL */}
                    <div className="single-member-popover-header-title flex">
                        <div className="single-member-title flex direction-row">
                            <Avatar src={user.imgUrl} className="avatar">
                                <p>{user.initials}</p>
                            </Avatar>
                            <div className="user-name-info">
                                <p className="fullname">{user.fullname}</p>
                                <p className="username">{user.username}</p>
                                {(loggedInUser._id === user._id) && <Link className="edit-profile" to="/boards" onClick={this.handleClose}>Edit profile info</Link>}
                            </div>
                        </div>
                        <button className="close-popover" onClick={this.handleClose}></button>
                    </div>
                    <div className="popover-content-container">
                        <div>Remove from card</div>
                    </div>
                </Popover >
            </React.Fragment>
        );
    }

}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const SingleMemberPopover = connect(mapStateToProps)(_SingleMemberPopover)