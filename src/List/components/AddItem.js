import React, { useContext } from "react";
import { ThemeContext } from "../../context";

export default function AddItem({ handleButton }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`bg-${theme}`} onClick={() => handleButton()}>
      + 新建一個事項
    </div>
  );
}
