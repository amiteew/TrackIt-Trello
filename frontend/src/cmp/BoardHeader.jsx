import React from 'react'
import { connect } from 'react-redux'


class _BoardHeader extends React.Component {

    state = {
        boardTitle: ""

    }
    componentDidMount() {
        this.props.loadUsers();
        this.props.loadBoard();
    }

    render() {
        const { boardTitle: boardName } = this.state;

        return (
            <div className="board-Header">
                <h1>
                    <input
                        name='boardName'
                        id='boardName'
                        type='text'
                        placeholder='boardName'
                        value={boardName}
                        onChange={this.handleChange}
                    />

                </h1>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadUsers,
    loadBoards
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)