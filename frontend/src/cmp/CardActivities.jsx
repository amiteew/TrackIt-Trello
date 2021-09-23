import React from 'react';
import { Loading } from './Loading';
import { ActivityList } from './ActivityList';
export class CardActivities extends React.Component {

    state = {
        activities: null,
        isDetails: false
    }

    componentDidMount() {
        this.setState({ activities: this.props.cardActivities })
    }

    onToggleDetails = () => {
        this.setState({ ...this.state, isDetails: !this.state.isDetails })
    }

    render() {
        let { activities, isDetails } = this.state
        if (!activities) return <Loading />
        if (!isDetails) {
            activities = activities.filter(activity => activity.type === "comment")
        }
        return (
            <div>
                <h3>Activities</h3>
                <button onClick={this.onToggleDetails}>Show details</button>
                <ActivityList activities={activities} />
            </div>
        )
    }
}