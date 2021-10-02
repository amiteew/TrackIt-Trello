import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';
import { CreateBoard } from '../CreateBoard';

class _AppHeader extends React.Component {
    state = {
        isAddBoard: false
    }

    onToggleCreateBoard = () => {
        const { isAddBoard } = this.state
        this.setState({ isAddBoard: !isAddBoard })
    }

    render() {
        const { loggedInUser } = this.props
        if (!loggedInUser) return (<></>)
        return (
            <>
                <header className="main-header">
                    <nav className="nav-bar flex space-between" >
                        <div className="main-nav-links flex align-center">
                            <LogoName isLoggedIn={true} />
                            <NavLink className="header-btn" to="/boards">
                                <span>Boards</span>
                                <img src="" alt="" />
                            </NavLink>
                            <button className="header-btn create" onClick={this.onToggleCreateBoard}>Create</button>
                        </div>
                        <div className="user-section">
                            <DynamicPopover type={'userMenu'} titleModal={'Account'} loggedInUser={loggedInUser} />
                        </div>
                    </nav >
                </header >
                {this.state.isAddBoard && <CreateBoard fullname={loggedInUser.fullname} onToggleCreateBoard={this.onToggleCreateBoard}/>}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)