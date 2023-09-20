import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import classnames from "classnames";
import css from "./navigation.module.scss";

import Menu from "./components/Menu";
import Settings from "./components/Settings";

import { ThemeContext } from "../context";

export default function Navigation(props) {
  const location = useLocation();
  const params = useParams();
  const { theme } = useContext(ThemeContext);

  const defaultNav = () => {
    return (
      <>
        <Menu pendingList={props.pendingList} />
        <div className={classnames(css.topNav)}>TODO</div>
      </>
    )};
  const detailsNav = () => (
    <div className={classnames(css.topNav)}>Detials</div>
  );

  return (
    <div>
      <div className={classnames(css.container, `bg-main-${theme}`)}>
        {location.pathname === "/" ? defaultNav() : detailsNav()}
      </div>

      <Settings />
    </div>
  );
}
