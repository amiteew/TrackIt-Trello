import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';
import { CreateBoard } from '../CreateBoard';
import { socketService } from "../../services/socket.service";
import { setNotif, setNotifCount } from '../../store/board.actions';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

class _AppHeader extends React.Component {

    state = {
        isCreateBoard: false,
        isNotif: false
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onToggleCreateBoard = () => {
        const { isCreateBoard } = this.state
        this.setState({ isCreateBoard: !isCreateBoard })
    }

    markReadNotif = () => {
        this.props.setNotif(false);
        // this.props.setNotifCount(0)
    }

    render() {
        const { loggedInUser, isNotif } = this.props;
        const { } = this.state;
        if (!loggedInUser) return (<></>)
        const notificaion = isNotif ? 'newNotif' : 'noNotif';
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
                        <div >
                            <DynamicPopover type={notificaion}
                                titleModal={'Notifications'} markReadNotif={this.markReadNotif} />
                        </div>

                        {/* {!isNotifi && <div><NotificationsNoneIcon /> </div>}
                        {isNotifi && <div><NotificationsActiveOutlinedIcon /></div>} */}
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
        isNotif: state.boardReducer.isNotif,
        loggedInUser: state.userReducer.loggedInUser,
        notifCount: state.boardReducer.notifCount
    }
}

const mapDispatchToProps = {
    setNotif,
    setNotifCount
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)