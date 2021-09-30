import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';

function _AppHeader(props) {
    const { loggedInUser } = props
    if (!loggedInUser) return (<></>)
    return (
        <header className="main-header">
            <nav className="nav-bar flex space-between" >
                <div className="main-nav-links flex align-center">
                    <LogoName isLoggedIn={true} />
                    <NavLink className="header-btn" to="/boards">
                        <span>Boards</span>
                        <img src="" alt="" />
                    </NavLink>
                    <NavLink className="header-btn create" to="/boards">Create</NavLink>
                </div>
                <div className="user-section">
                    <DynamicPopover type={'userMenu'} titleModal={'Account'} loggedInUser={loggedInUser} />
                </div>
            </nav >
        </header >
    )
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)