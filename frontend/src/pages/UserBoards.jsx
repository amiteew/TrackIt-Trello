import React from 'react'
import { connect } from 'react-redux'

class _UserBoards extends React.Component {
    componentDidMount() {
        if (!this.props.loggedInUser) {
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <section className="boards-page">
                <section className="starred-boards">
                    
                </section>
                <section className="boards">unstarred</section>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const UserBoards = connect(mapStateToProps)(_UserBoards)
