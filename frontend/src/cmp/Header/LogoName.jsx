import { NavLink } from 'react-router-dom'
import ColorLogo from '../../assets/imgs/trackit-logo.svg'
import WhiteLogo from '../../assets/imgs/trackit-logo-white.svg'

export function LogoName({ isLoggedIn }) {
    const linkUrl = isLoggedIn ? "/boards" : "/"
    const logoUrl = isLoggedIn ? WhiteLogo : ColorLogo

    return (
        <NavLink to={linkUrl} >
            <div className="logo-container flex align-center">
                <span className="icon-span flex align-center justify-center"><img className="icon" src={logoUrl} alt="" /></span>
                <h1 className="logo-name">TrackIt</h1>
            </div>
        </NavLink>
    )
}