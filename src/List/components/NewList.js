import React, { useState } from "react";
import css from "../list.module.scss";
import NewItem from "./NewItem";
import AddItem from "./AddItem";

export default function NewList(props) {
  const [showInput, setShowInput] = useState(false);
  const handleToggle = () => {
    setShowInput(!showInput);
  };

  return (
    <div className={css.container}>
      {showInput ? (
        <div className={css.newListForm}>
          <NewItem />
        </div>
      ) : (
        <div className={css.buttonCenter}>
          <AddItem handleButton={handleToggle} />
        </div>
      )}
    </div>
  );
}
