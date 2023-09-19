import React, { useContext } from "react";
import css from "./navigation.module.scss";
import classnames from "classnames";

import Menu from "./components/Menu";
import Settings from "./components/Settings";

import { ThemeContext } from "../context";

export default function Navigation(props) {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className={classnames(css.container, `bg-main-${theme}`)}>
        <Menu pendingList={props.pendingList} />
        <div className={classnames(css.topNav)}>TODO</div>
      </div>

      <Settings />
    </div>
  );
}
