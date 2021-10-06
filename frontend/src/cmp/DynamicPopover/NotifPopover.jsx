import React from 'react';
import { connect } from 'react-redux';
import { setNotif, setNotifCount } from '../../store/board.actions';
import { ActivityPreview } from '../ActivityPreview';
import { withRouter } from 'react-router-dom';

class _NotifPopover extends React.Component {

    onNotifClick = (cardId) => {
        const { board } = this.props
        const list = board.lists.find(list => list.cards.find(card => card.cardId === cardId))
        if (!list) this.props.history.push(`/cardNotFound`)
        else this.props.history.push(`/boards/${board._id}/${list.listId}/${cardId}`);
        this.props.handleClose()
    }

    render() {
        const { board, notifCount } = this.props
        const notifications = board.activities.filter(activity => activity.isNotif)
        return (
            <div className="notif-popover">
                {notifications.length ?
                    notifications.map((activity, idx) =>
                        <div onClick={() => this.onNotifClick(activity.card.cardId)}
                            className={`notif ${(idx < notifCount) ? 'unread' : ''}`} >
                            <ActivityPreview activity={activity} display={'menu'} key={activity.id} />
                        </div>)

                    : <div>Sorry... no new notifications to show</div>}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        isNotif: state.boardReducer.isNotif,
        loggedInUser: state.userReducer.loggedInUser,
        notifCount: state.boardReducer.notifCount,
    }
}

const mapDispatchToProps = {
    setNotif,
    setNotifCount
}

const _NotifPopoverWithRouter = withRouter(_NotifPopover);
export const NotifPopover = connect(mapStateToProps, mapDispatchToProps)(_NotifPopoverWithRouter)