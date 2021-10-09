import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { Loading } from '../Loading';
import { CommentsList } from './CommentsList';
import { ActivityList } from './ActivityList';
import { utilService } from '../../services/util.service';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

class _CardActivities extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        isEditing: false,
        isDetails: false,
        newActivityTxt: ''
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ ...this.state, board, currListIdx, currCardIdx })
        console.log('loggedin user: ', this.props.loggedInUser)
    }

    onToggleDetails = () => {
        this.setState({ ...this.state, isDetails: !this.state.isDetails })
    }
    onToggleComment = () => {
        this.setState({ ...this.state, isEditing: true })
    }
    handleChange = ({ target }) => {
        this.setState({ ...this.state, newActivityTxt: target.value });
    }
    onSaveActivity = (ev) => {
        ev.stopPropagation()
        if (!this.state.newActivityTxt) return
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        newBoard.lists[currListIdx].cards[currCardIdx].comments.unshift({
            byMember: this.props.loggedInUser,
            createdAt: Date.now(),
            id: utilService.makeId(),
            txt: this.state.newActivityTxt
        })

        const currCard = newBoard.lists[currListIdx].cards[currCardIdx];
        const action = `Added comment`
        const txt = this.state.newActivityTxt.substring(0, 20)
        this.props.OnUpdateBoard(newBoard, action, currCard, txt)
        this.setState({ ...this.state, newActivityTxt: '', isEditing: false });
    }

    render() {
        let { isEditing, isDetails, newActivityTxt, board, currListIdx, currCardIdx } = this.state
        const { loggedInUser } = this.props
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const comments = board.lists[currListIdx].cards[currCardIdx].comments
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (
            <div className="card-activities">
                <div className="flex direction-row space-between ">
                    <div className="flex direction-row">
                        <FormatListBulletedIcon className="card-details-icon" />
                        <h3 className="card-subtitle">Activity</h3>
                    </div>
                    {!isDetails && <button className="show-hide hover" onClick={this.onToggleDetails}>Show details</button>}
                    {isDetails && <button className="show-hide hover" onClick={this.onToggleDetails}>Hide details</button>}
                </div>
                <div className="add-comment-container flex direction-row ">
                    <Avatar className="card-details-avatar" alt={loggedInUser.username} src={loggedInUser.imgUrl} />
                    <div className=" comment-container flex direction-col" onClick={this.onToggleComment}>
                        <TextareaAutosize
                            className="input-comment text-area-auto"
                            name='description'
                            type='text'
                            placeholder='Write a comment...'
                            onChange={this.handleChange}
                            value={newActivityTxt}
                        />
                        {isEditing && <button className="comment-save" onClick={(ev) => this.onSaveActivity(ev)}>Save</button>}
                    </div>
                </div>

                {currCard.comments.length ? <CommentsList comments={currCard.comments} /> : <></>}
                {isDetails && <ActivityList currCard={currCard} activities={board.activities} />}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser
    }
}


export const CardActivities = connect(mapStateToProps)(_CardActivities)