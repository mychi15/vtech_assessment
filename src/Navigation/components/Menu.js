import React, { useContext, useState } from "react";
import classnames from 'classnames';
import css from "../navigation.module.scss";

import { ListContext, ThemeContext } from "../../context";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showMenu && <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />}
      <Hamburger showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
}

function SideBar({ showMenu, setShowMenu }) {
  const { setShowItemType, showItemType } = useContext(ListContext);
  const { theme } = useContext(ThemeContext);

  const handleMenuItem = (status) => {
    setShowItemType(status);
    setShowMenu(!showMenu);
  }

  const activeClasses = classnames({
    [`bg-${theme}`]: true,
    [`${theme}`]: true
  })

  const hoverClasses = classnames({
    [`hover-${theme}`]: true
  })

  return (
    <div className={css.menuContainer}>
      <div className={css.menuSideBar}>
        <div className={css.menuHeader}>TODO</div>
        <div onClick={() => handleMenuItem("all")} className={classnames(css.menuItem, showItemType === "all" ? activeClasses : hoverClasses)}>
          <div>所有事項</div>
        </div>
        <div onClick={() => handleMenuItem("completed")} className={classnames(css.menuItem, showItemType === "completed" ? activeClasses : hoverClasses)}>
          <div>已完成事項</div>
        </div>
        <div onClick={() => handleMenuItem("pending")} className={classnames(css.menuItem, showItemType === "pending" ? activeClasses : hoverClasses)}>
          <div>未完成事項</div>
        </div>
      </div>
      <div className={css.menuOverlay} onClick={() => setShowMenu(!showMenu)} />
    </div>
  );
}

function Hamburger({ showMenu, setShowMenu }) {
  return (
    <div onClick={() => setShowMenu(!showMenu)} className={css.hamburger}>
      <div />
      <div />
      <div />
    </div>
  );
}
