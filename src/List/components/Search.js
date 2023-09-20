import React, { useContext, useRef } from "react";
import css from "../list.module.scss";
import NewItem from "./NewItem";
import { ThemeContext, SearchContext } from "../../context";

export default function Search(props) {
  const { showItemInput, handleToggle } = props;

  return (
    <div className={css.container}>
      {showItemInput ? (
        <NewItem
          showCancel={true}
          postSubmit={handleToggle}
          localFunction={handleToggle}
        />
      ) : (
        <SearchInput />
      )}
    </div>
  );
}

function SearchInput() {
  const { theme } = useContext(ThemeContext);
  const { searchType, setSearchValue, setSubSearchValue } =
    useContext(SearchContext);

  const inputRef = useRef();
  const handleForm = (e) => {
    e.preventDefault();
    searchType === "default"
      ? setSearchValue(inputRef.current.value)
      : setSubSearchValue(inputRef.current.value);
    document.activeElement.blur();
  };

  const handleChange = () => {
    if (!inputRef.current.value) {
      searchType === "default"
      ? setSearchValue(inputRef.current.value)
      : setSubSearchValue(inputRef.current.value);    
    }
  }

  return (
    <form onSubmit={(e) => handleForm(e)}>
      <input type="text" placeholder="輸入事項名" onFocus={() => inputRef.current.value = ""} onChange={(e) => handleChange(e)} ref={inputRef} />
      <button type="submit" className={`bg-main-${theme}`}>
        搜尋
      </button>
    </form>
  );
}
