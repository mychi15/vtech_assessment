import React, { useContext } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import css from "./navigation.module.scss";

import Menu from "./components/Menu";
import Settings from "./components/Settings";

import { ThemeContext } from "../context";

export default function Navigation(props) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const defaultNav = () => {
    return (
      <>
        <Menu pendingList={props.pendingList} />
        <div className={classnames(css.topNav)}>TODO</div>
      </>
    )};
  const detailsNav = () => (
    <>
      <div className={css.navButton} onClick={() => navigate("/")}>返回</div>
      <div className={css.navDetails}>{params?.itemTitle}</div>
    </>
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
