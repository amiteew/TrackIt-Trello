import React from 'react';
import { Loading } from './Loading';
import { ActivityList } from './ActivityList';
import { DebounceInput } from 'react-debounce-input';
export class CardActivities extends React.Component {

    state = {
        activities: null,
        isEditing: false,
        isEditing: false,
        newActivityTxt: ''
    }

    componentDidMount() {
        this.setState({ activities: this.props.cardActivities })
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
        // const newActivity = {
        //     activityId: 'a34hb34',
        //     txt: this.state.newActivityTxt,
        //     type: 'userAction',
        //     byMember: { _id: '3231ff', fullname: 'Guest', imgUrl: '' },
        //     createdAt: Date.now()
        // }

        this.setState({ ...this.state, newActivityTxt: '', isEditing: false });
    }

    render() {
        let { activities, isEditing, isDetails, newActivityTxt } = this.state
        if (!activities) return <Loading />
        if (!isDetails) {
            activities = activities.filter(activity => activity.type === "comment")
        }
        return (
            <div>
                <h3>Activity</h3>

                <div onClick={this.onToggleComment}>
                    <textarea
                        name='description'
                        type='text'
                        placeholder='Write a comment...'
                        onChange={this.handleChange}
                        value={newActivityTxt}
                    />
                    {isEditing && <button onClick={this.onSaveActivity}>Save</button>}
                </div>

                {!isDetails && <button onClick={this.onToggleDetails}>Show details</button>}
                {isDetails && <button onClick={this.onToggleDetails}>Hide details</button>}
                <ActivityList activities={activities} />
            </div>
        )
    }
}