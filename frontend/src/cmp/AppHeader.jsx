import React from 'react'
// import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { UserMsg } from './user-msg.jsx'
// import { onLogout } from '../store/user.actions.js'

export class AppHeader extends React.Component {

    render() {
        // const {user} = this.props;
        return (
            <header className="main-header">
                <nav>
                    <NavLink to="/home">Home</NavLink> |
                    <NavLink to="/boards">Boards</NavLink> |
                    <NavLink to="/login">Login</NavLink> |
                </nav>
                {/* <UserMsg /> */}
            </header>
        )
    }
}

function mapStateToProps() {
    return {
        // user: state.userReducer.user,
    }
}

const mapDispatchToProps = {
    // onLogout
}

// export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)