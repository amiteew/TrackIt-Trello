import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';
import { CreateBoard } from '../CreateBoard';

class _AppHeader extends React.Component {
    state = {
        isCreateBoard: false,
        isUserBoardsOpen: false
    }

    onToggleCreateBoard = () => {
        const { isCreateBoard } = this.state
        this.setState(prevState => ({ ...prevState, isCreateBoard: !isCreateBoard }))
    }

    onToggleUserBoards = () => {
        const { isUserBoardsOpen } = this.state
        this.setState(prevState => ({ ...prevState, isUserBoardsOpen: !isUserBoardsOpen }))
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
                            <span className={`user-boards${this.state.isUserBoardsOpen ? " open" : ""}`}>
                                <DynamicPopover type={'userBoards'} titleModal={'Your Boards'} onToggleUserBoards={this.onToggleUserBoards} />
                            </span>
                            {/* <NavLink className="header-btn" to="/boards">
                                <span>Boards</span>
                                <img src="" alt="" />
                            </NavLink> */}
                            <button className="header-btn create" onClick={this.onToggleCreateBoard}>Create</button>
                        </div>
                        <div className="user-section">
                            <DynamicPopover type={'userMenu'} titleModal={'Account'} loggedInUser={loggedInUser} />
                        </div>
                    </nav >
                </header >
                {this.state.isCreateBoard && <CreateBoard onToggleCreateBoard={this.onToggleCreateBoard} />}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)