import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { HomeHeader } from './HomeHeader';
// import { UserMsg } from './user-msg.jsx'
// import { onLogout } from '../store/user.actions.js'

class _AppHeader extends React.Component {
    state = {
        user: null
        // user: "null"
    }

    render() {
        const { user } = this.state;
        return (
            <>
                {user ?
                    <header className="main-header">
                        <nav className="main-nav-bar flex space-between" >
                            <div className="main-nav-links">
                                <img className="main-logo" src="https://icons-for-free.com/iconfiles/png/512/trello-1324440245560066218.png" alt="" />
                                <NavLink to="/" className="logo-name"><h1>Trello</h1></NavLink> |
                                <NavLink to="/b">Boards</NavLink> |
                            </div>
                            <div className="user-section">
                                <Avatar alt={"AW"} src={"httpx://res.cloudinary.com/amiteew/image/upload/v1632416023/amitee_yg3luy.jpg"} />
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

function mapStateToProps() {
    return {
        // user: state.userReducer.user,
    }
}

const mapDispatchToProps = {
    // onLogin,
    // onSignup,
    // onLogout,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)