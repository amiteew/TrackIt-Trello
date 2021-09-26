import React from 'react'
import { connect } from 'react-redux'
import { HomeHeader } from '../cmp/Header/HomeHeader'
import { onLogin } from '../store/user.actions'

class _HomePage extends React.Component {
    onStartAsGuest = async () => {
        const guestCreds = {
            username: "guest123",
            password: "1"
        }
        try {
            await this.props.onLogin(guestCreds);
            this.props.history.push('/boards')
        } catch (err) {
            console.log('error login as guest');
        }
    }

    render() {
        return (
            <>
                <section className="home-page main-container">
                    <HomeHeader />
                    {/* <HomeHeader className="full"/> */}
                    <div className="hero flex align-center">
                        <div className="info flex direction-col justify-center align-center">
                            <h1>TrackIt helps teams to stay on track.</h1>
                            <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with TrackIt.</p>
                            <button onClick={this.onStartAsGuest} className="start home-btn">Get Started!</button>
                        </div>
                        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
                    </div>
                </section >
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    onLogin
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)