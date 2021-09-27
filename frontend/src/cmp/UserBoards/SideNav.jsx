import { NavLink } from 'react-router-dom';

import { HiOutlineTemplate } from 'react-icons/hi';
import { MdDeveloperBoard } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

export function SideNav() {
    return (
        <section className="side-nav flex direction-col">
            <div className="nav-item">
                <MdDeveloperBoard />
                <NavLink to="/boards">Boards</NavLink>
            </div>
            <div className="nav-item">
                <HiOutlineTemplate />
                <NavLink to="/templates">Templates</NavLink>
            </div>
            <AiOutlineHome />
            <NavLink to="/">Home</NavLink>
        </section>
    )
}