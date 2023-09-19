import React, { useContext } from "react";
import css from "../navigation.module.scss";
import classnames from "classnames";
import { ThemeContext } from "../../context";

export default function Settings() {
  const { themeOptions } = useContext(ThemeContext);

  return (
    <div className={css.settings}>
      {themeOptions.map((option) => {
        return <Theme option={option} />;
      })}
    </div>
  );
}

function Theme({ option }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const active = option && option.color === theme ? `active-${theme}` : "";
  return (
    <div
      className={classnames(css.colorContainer, css[active])}
      onClick={() => setTheme(option.color)}
    >
      <div className={classnames(css.color, `bg-main-${option.color}`)}></div>
      <div>{option.text}</div>
    </div>
  );
}
