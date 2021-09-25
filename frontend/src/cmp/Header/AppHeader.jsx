import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

import { HomeHeader } from './HomeHeader';
import { LogoName } from './LogoName';
// import { UserMsg } from './user-msg.jsx'
// import { onLogout } from '../store/user.actions.js'

class _AppHeader extends React.Component {
    render() {
        const user = this.props.loggedInUser;
        return (
            <>
                {user ?
                    <header className="main-header">
                        <nav className="nav-bar flex space-between" >
                            <div className="main-nav-links flex align-center">
                                <LogoName isLoggedIn={true} />
                                <NavLink to="/boards">Boards ➤</NavLink>
                                <NavLink to="/b">Create</NavLink>
                            </div>
                            <div className="user-section">
                                <Avatar alt={user.initials} src={user.imgUrl} />
                            </div>
                        </nav >
                    </header >
                    :
                    <HomeHeader />
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)