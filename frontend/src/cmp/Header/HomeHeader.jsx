import { NavLink } from 'react-router-dom'

export function HomeHeader() {
    return (
        <header className="home-header flex">
            <nav className="nav-bar flex space-between align-center">
                <div className="logo-container flex align-center">
                    <img className="icon" src="https://seeklogo.com/images/T/trello-logo-CE7B690E34-seeklogo.com.png" alt="" />
                    <NavLink to="/" className="logo-name"><h1>Trello</h1></NavLink>
                </div>
                <div className="login-signup">
                    <NavLink to="/login">Login</NavLink> |
                    <NavLink to="/signup">Signup</NavLink> |
                </div>
            </nav>
        </header>
    )
}