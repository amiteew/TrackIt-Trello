import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { ShowMenu } from '../cmp/ShowMenu.jsx';

export function TemporaryDrawer({ board, toggleMenu }) {

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <span onClick={toggleMenu}>X</span>
                <h1>Menu</h1>
            </List>
            <Divider />
            <List>
                <ShowMenu board={board} />
            </List>
        </Box>
    );
    const anchor = 'right';

    return (
        <div>
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                    anchor={anchor}
                    open={anchor}
                    onClose={toggleDrawer(anchor, false)}
                    hideBackdrop={true}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
