import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';

import { HomeHeader } from './HomeHeader';
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';
// import { UserMsg } from './user-msg.jsx'
// import { onLogout } from '../store/user.actions.js'

class _AppHeader extends React.Component {
    // checkIfTemplate = () => {

    // }

    render() {
        const { loggedInUser } = this.props
        if (!loggedInUser) return (<></>)
        return (
            <header className="main-header">
                <nav className="nav-bar flex space-between" >
                    <div className="main-nav-links flex align-center">
                        <LogoName isLoggedIn={true} />
                        <NavLink to="/boards">Boards ➤</NavLink>
                        <NavLink to="/">Create</NavLink>
                    </div>
                    <div className="user-section">
                        <DynamicPopover type={'userMenu'} titleModal={'Account'} loggedInUser={loggedInUser} />
                    </div>
                </nav >
            </header >
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)