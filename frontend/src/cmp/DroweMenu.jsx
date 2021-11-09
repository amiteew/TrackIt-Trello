import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { ShowMenu } from "../cmp/ShowMenu.jsx";
import close from "../assets/imgs/close.svg";

export function TemporaryDrawer({ board, toggleMenu, isMenuOpen }) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    toggleMenu();
    console.log("toggle menu");
  };

  const list = (anchor) => (
    <div className="menu-wrapper">
      <div className="menu-screen" onClick={toggleDrawer(anchor, false)}></div>
      <div
        className="board-menu-content"
      >
        <div className="board-menu-content-header flex">
          <div className="title">
            <h3>Menu</h3>
          </div>
          <span className="exit-icon" onClick={toggleDrawer(anchor, false)}>
            <img src={close} alt="Close" />
          </span>
        </div>
        <Divider />

        <div className="menu-content fancy-scrollbar">
          <div className="board-actions">
            <button className="menu-action-btn">
              Change background
            </button>
          </div>
          <Divider />
          <div className="activities">
            <ShowMenu board={board} />
          </div>
        </div>
      </div>
    </div>
  );
  const anchor = "right";

  return (
    <div className="menu-visible">
      <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        <Drawer
          anchor={anchor}
          open={isMenuOpen}
          hideBackdrop={true}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
