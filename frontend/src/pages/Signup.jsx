import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onSignup } from '../store/user.actions'
import { Loading } from '../cmp/Loading.jsx'
import { LogoName } from '../cmp/Header/LogoName'
import GoogleLogin from 'react-google-login';

class _Signup extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: ''
        },
        isSignupFailed: false,
        isLoading: false
    }
    componentDidMount() {
    }

    clearForm = () => {
        const emptyCredentials = {
            username: '',
            password: '',
            fullname: '',
            imgUrl: ''
        }
        this.setState(prevState => ({ ...prevState, credentials: emptyCredentials }))
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onSignup = async (ev = null) => {
        if (ev) ev.preventDefault();
        try {
            this.setState({ isLoading: true })
            await this.props.onSignup(this.state.credentials);
            // await this.props.loadBoards(this.props.loggedInUser._id)
            this.props.history.push('/boards')
        } catch (err) {
            this.setState(prevState => ({ ...prevState, isLoading: false, isSignupFailed: true }))
            this.clearForm()
            setTimeout(this.clearErrMsg, 5000)
        }
    }

    clearErrMsg = () => {
        this.setState({ isSignupFailed: false })
    }

    responseGoogle = (response) => {
        console.log(response);
        const fullname = response.profileObj.name;
        const username = response.profileObj.givenName;
        const imgUrl = response.profileObj.imageUrl;
        this.setState({ credentials: { ...this.state.credentials, fullname, username, imgUrl}})
        this.onSignup();
    }
    
    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignupFailed, isLoading } = this.state
        return (
            <div className="login-signup-page">
                <LogoName isLoggedIn={false} />
                <div className="form-container">
                    {isLoading && <Loading />}
                    {isSignupFailed && <p className="login-signup-error">Username is already in use</p>}
                    <h3>Sign up for your account</h3>
                    <form className="login-signup-form flex direction-col align-center justify-center" onSubmit={this.onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            placeholder="Full Name"
                            onChange={this.handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />

                        <GoogleLogin
                            clientId="424178974509-9hf317najboqtp0hkg1to5j6ogduo4r6.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <button>Sign up</button>
                    </form>
                    <Link className="to-login-signup" to="/login">Already have an account? Log In</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}
const mapDispatchToProps = {
    onSignup
}


export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)