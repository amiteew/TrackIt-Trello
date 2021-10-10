import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { AppHeader } from './cmp/Header/AppHeader.jsx'
import { UserMsg } from './cmp/UserMsg';
import { connect } from 'react-redux'
import { setOffline, updateBoard } from '../src/store/board.actions';
import { storageService } from '../src/services/storage.service';
import { showErrorMsg, showSuccessMsg } from '../src/services/event-bus.service'

class _RootCmp extends React.Component {

    componentDidMount() {
        window.addEventListener('offline', () => {
            console.log('offline');
            this.props.setOffline(true);
            showErrorMsg('offline, changes will sync when back online')
        })
        window.addEventListener('online', () => {
            console.log('online');
            this.props.setOffline(false);
            if (storageService.loadFromStorage('BOARD_DB')) {
                const board = storageService.loadFromStorage('BOARD_DB')
                storageService.saveToStorage('BOARD_DB', null);
                this.props.updateBoard(board)
                showSuccessMsg('Back online,all changes updated!')
            }
        })
    }

    componentWillUnmount() {

    }



    render() {
        return (
            <>
                <AppHeader />
                <main>
                    <Switch>
                        {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                        {/* {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)} */}
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
