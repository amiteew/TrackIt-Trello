import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { AppHeader } from './cmp/Header/AppHeader.jsx'
import { UserMsg } from './cmp/UserMsg';
import { connect } from 'react-redux'
import { setOffline, updateBoard } from '../src/store/board.actions';
import { storageService } from '../src/services/storage.service';
import { showErrorMsg, showSuccessMsg } from '../src/services/event-bus.service'
import { socketService } from '../src/services/socket.service'


class _RootCmp extends React.Component {

    componentDidMount() {
        window.addEventListener('offline', this.onOffline)
        window.addEventListener('online', this.onOnline)
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.onOnline)
        window.removeEventListener('offline', this.onOffline)
    }

    onOnline = () => {
        console.log('online');
        if (storageService.loadFromStorage('BOARD_DB')) {
            const board = storageService.loadFromStorage('BOARD_DB')
            storageService.saveToStorage('BOARD_DB', null);
            socketService.emit('boardId', board._id);
            this.props.updateBoard(board)
            showSuccessMsg('Back online,all changes updated!')
        }
    }

    onOffline = () => {
        console.log('offline');
        this.props.setOffline(true);
        showErrorMsg('offline, changes will sync when back online')
    }

    render() {
        return (
            <>
                <AppHeader />
                <main>
                    <Switch>
                        {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    </Switch>
                    <UserMsg />
                </main>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        isOffline: state.boardReducer.isOffline
    }
}
const mapDispatchToProps = {
    setOffline,
    updateBoard
}


export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp)
