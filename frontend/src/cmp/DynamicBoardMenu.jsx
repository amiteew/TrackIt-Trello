import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { IoChevronBackOutline } from 'react-icons/io5'
import close from '../assets/imgs/close.svg';
import { MainBoardMenuContent } from './DynamicPopover/BoardMenu/MainBoardMenuContent';
import { SelectBgType } from './DynamicPopover/BoardMenu/SelectBgType';
import { ChooseBgColor } from './DynamicPopover/BoardMenu/ChooseBgColor';
import { ChooseBgImg } from './DynamicPopover/BoardMenu/ChooseBgImg';
import { SearchMenu } from './SearchMenu';
import { ArchiveItems } from './ArchiveItems';

export function DynamicBoardMenu({ board, toggleMenu, isMenuOpen, target, title, changeMenu, onFilterCards }) {

    const DynamicCmp = (props) => {
        switch (props.target) {
            case 'main':
                return <MainBoardMenuContent {...props} />
            case 'select-bg-type':
                return <SelectBgType {...props} />
            case 'colors':
                return <ChooseBgColor {...props} />
            case 'photos':
                return <ChooseBgImg {...props} />
            case 'search':
                return <SearchMenu {...props} />
            case 'archive':
                return <ArchiveItems {...props} />
        }
    }

    const anchor = 'right';

    return (
        <div className="menu-visible">
            <React.Fragment key={anchor}>
                <Button onClick={toggleMenu}>{anchor}</Button>
                <Drawer
                    anchor={anchor}
                    open={isMenuOpen}
                    // onClose={toggleDrawer(anchor, false)}
                    hideBackdrop={true}
                >
                    <div className="menu-wrapper">
                        <div className="menu-screen" onClick={toggleMenu}></div>
                        <div className="board-menu-content">
                            <div className="board-menu-content-header flex">
                                <div className="title"><h3>{title}</h3></div>
                                <span className="exit-icon" onClick={toggleMenu}>
                                    <img src={close} alt="Close" />
                                </span>

                                {(target !== 'main') &&
                                    <span className="back-icon" onClick={() => changeMenu('Menu', 'main')}>
                                        <IoChevronBackOutline />
                                    </span>}
                            </div>
                            <Divider />
                            <div className="menu-content fancy-scrollbar">
                                <DynamicCmp target={target} board={board} changeMenu={changeMenu} onFilterCards={onFilterCards}/>
                            </div>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}
