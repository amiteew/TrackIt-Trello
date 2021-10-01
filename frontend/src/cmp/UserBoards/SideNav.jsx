import { NavLink } from 'react-router-dom';

import { HiOutlineTemplate } from 'react-icons/hi';
import { MdDeveloperBoard } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

export function SideNav({ path }) {
    return (
        <section className="side-nav flex direction-col">
            <NavLink to="/boards">
                <div className={`nav-item flex align-center${path === "boards" ? " active" : ""}`}>
                    <MdDeveloperBoard />
                    <h3>Boards</h3>
                </div>
            </NavLink>
            <NavLink to="/templates">
                <div className={`nav-item flex align-center${path === "templates" ? " active" : ""}`}>
                <HiOutlineTemplate />
                <h3>Templates</h3>
                </div >
            </NavLink>
        </section>
    )
}