import { NavLink } from 'react-router-dom'
import ColorLogo from '../../assets/imgs/trackit-logo.svg'
import WhiteLogo from '../../assets/imgs/trackit-logo-white.svg'

export function LogoName({ isLoggedIn }) {
    const linkSrc = isLoggedIn ? "/boards" : "/"
    const imgUrl = isLoggedIn ? WhiteLogo : ColorLogo
    return (
        <NavLink to={linkSrc} >
            <div className="logo-container flex align-center">
                <span className="icon-span flex align-center justify-center"><img className="icon" src={imgUrl} alt="" /></span>
                <h1 className="logo-name">TrackIt</h1>
            </div>
        </NavLink>
    )
}