import React from 'react';
export class CardActivities extends React.Component {
    state = {
        activities: null
    }

    componentDidMount() {
        this.setState({ activities: this.props.cardActivities })
    }

    render() {
        // if (!)
        return (
            <div>
                <h3>Activities</h3>
                <button>Show details</button>
            </div>
        )
    }
}