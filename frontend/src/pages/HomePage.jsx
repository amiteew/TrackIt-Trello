import React from 'react'
// import { connect } from 'react-redux'
import { boardService } from '../services/board.service'

export class HomePage extends React.Component {
    state = {}

    componentDidMount() {
        if (this.props.user) {
            this.props.history.push('/boards')
        }
    }

    render() {
        return (
            <section className="home-page">
                <div className="first-fold flex">
                    <div className="side">
                        <h1>Trello helps teams move work forward.</h1>
                        <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trello.</p>
                        <button>Get Started</button>
                    </div>
                    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
                </div>
            </section >
        )
    }
}

function mapStateToProps() {
    return {
    }
}

// export const HomePage = connect(mapStateToProps)(_HomePage)