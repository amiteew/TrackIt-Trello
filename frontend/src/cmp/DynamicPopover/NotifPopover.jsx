import React from 'react';
import { connect } from 'react-redux';
import { setNotif, setNotifCount } from '../../store/board.actions';
import { ActivityPreview } from '../ActivityPreview';
import { withRouter } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

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
                            <div className="notification-content">
                                <div className="notif-card-titles flex direction-col" style={{ backgroundImage: `url(${board.boardStyle.small})` }}>
                                    <span className="notif-card-title">
                                        <span className="notif-card-txt">{activity.card.cardTitle}
                                        </span>
                                        </span>
                                    <span className="notif-card-board-title">{board.boardTitle}</span>
                                </div>
                                <Avatar className="notification-avatar" alt={activity.byMember.fullname} src={activity.byMember.imgUrl}
                                    key={activity.byMember._id} />
                                <span>{activity.byMember.fullname}</span>
                                <span>{activity.action} {activity.txt}</span>
                                {/* {(display === 'menu') && activity.card.cardTitle && `on card: "${activity.card.cardTitle}"`} */}
                                <small> {new Date(activity.createdAt).toString().substring(0, 16)}</small>
                            </div>
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