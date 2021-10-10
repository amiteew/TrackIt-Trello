import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { AppHeader } from './cmp/Header/AppHeader.jsx'
import { UserMsg } from './cmp/UserMsg';
import { connect } from 'react-redux'
import { setOffline } from '../src/store/board.actions';
import { storageService } from '../src/services/storage.service';

class _RootCmp extends React.Component {

    componentDidMount() {
        window.addEventListener('offline', () => {
            console.log('offline');
            this.props.setOffline(true);
            storageService.saveToStorage('BOARD_DB',this.props.board);
        })
        window.addEventListener('online', () => {
            console.log('online');
            this.props.setOffline(false);

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
    setOffline
}


export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmp)
