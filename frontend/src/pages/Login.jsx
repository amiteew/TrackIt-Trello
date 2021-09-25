import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin } from '../store/user.actions'
import { Loading } from '../cmp/Loading.jsx'
import { LogoName } from '../cmp/Header/LogoName'

class _Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
        },
        isLoginFailed: false,
        isLoading: false
    }
    componentDidMount() {
    }

    clearForm = () => {
        const emptyCredentials = {
            username: '',
            password: '',
        }
        this.setState(prevState => ({ ...prevState, credentials: emptyCredentials }))
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onLogin = async (ev = null) => {
        if (ev) ev.preventDefault();
        try {
            this.setState({ isLoading: true })
            await this.props.onLogin(this.state.credentials);
            this.props.history.push('/b')
        } catch (err) {
            this.setState(prevState => ({ ...prevState, isLoading: false, isLoginFailed: true }))
            this.clearForm()
            setTimeout(this.clearErrMsg, 5000)
        }
    }

    clearErrMsg = () => {
        this.setState({ isLoginFailed: false })
    }

    render() {
        const { username, password } = this.state.credentials;
        const { isLoginFailed, isLoading } = this.state
        return (
            <div className="login-page">
                <LogoName isLoggedIn={false} />
                <div className="form-container">
                    {isLoading && <Loading />}
                    {isLoginFailed && <p className="login-error">Login failed, please check your username and password</p>}
                    <h3>Log in to Trello</h3>
                    <form className="login-form flex direction-col align-center justify-center" onSubmit={this.onLogin}>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />
                        <button>Log in</button>
                    </form>
                    <Link className="to-signup" to="/signup">Sign up for an account</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}
const mapDispatchToProps = {
    onLogin
}


export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)