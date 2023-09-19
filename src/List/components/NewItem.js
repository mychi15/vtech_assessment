import React, { useContext, useRef } from "react";
import css from "../list.module.scss";

import { ListContext, ThemeContext } from "../../context";

export default function NewItem(props) {
  const { theme } = useContext(ThemeContext);
  const { handleAddToList } = useContext(ListContext);
  const { postSubmit, localFunction } = props;

  const inputRef = useRef();
  const handleForm = (e) => {
    e.preventDefault();
    handleAddToList(inputRef.current.value);
    inputRef.current.value = "";
    postSubmit && postSubmit();
  };

  return (
    <form onSubmit={(e) => handleForm(e)}>
      <input type="text" placeholder="輸入事項名" ref={inputRef} />
      <button type="submit" className={`bg-main-${theme}`}>
        新增
      </button>
      <button
        style={{ display: !props.showCancel && "none" }}
        onClick={(e) => localFunction(e)}
        className={css.disabled}
      >
        取消
      </button>
    </form>
  );
}
