import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { ShowMenu } from '../cmp/ShowMenu.jsx';
import close from '../assets/imgs/close.svg';

export function TemporaryDrawer({ board, toggleMenu, isMenuOpen }) {

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };

    const list = (anchor) => (
        <div className="board-menu-content"
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            // role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className="board-menu-content-header flex">
                <div className="title"><h3>Menu</h3></div>
                <span className="exit-icon" onClick={toggleMenu}>
                    <img src={close} alt="Close" />
                </span>
            </div>
            <Divider />
            <div>
                <ShowMenu board={board} />
            </div>
        </div>
    );
    const anchor = 'right';

    return (
        <div>
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                    anchor={anchor}
                    open={isMenuOpen}
                    onClose={toggleDrawer(anchor, false)}
                    hideBackdrop={true}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
