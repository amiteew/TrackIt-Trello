import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName'

export function HomeHeader() {
    return (
        <header className="home-header flex">
            <nav className="nav-bar flex space-between align-center">
                <LogoName isLoggedIn={false} />
                <div className="login-signup flex align-center">
                    <NavLink className="login" to="/login">Log in</NavLink>
                    <NavLink className="signup home-btn" to="/signup">Sign up</NavLink>
                </div>
            </nav>
        </header>
    )
}