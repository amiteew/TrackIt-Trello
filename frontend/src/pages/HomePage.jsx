import React from 'react'
// import { connect } from 'react-redux'
import { boardService } from '../services/board.service'

export class HomePage extends React.Component {
    state = {}

    render() {
        return (
            <section className="home-page">
                <h1>Welcome</h1>
            </section >
        )
    }
}

function mapStateToProps() {
    return {
    }
}

// export const HomePage = connect(mapStateToProps)(_HomePage)