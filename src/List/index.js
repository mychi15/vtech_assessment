import React, { useState, useContext, useEffect, useCallback } from "react";
import css from "./list.module.scss";
import classnames from "classnames";

import Search from "./components/Search";
import NewList from "./components/NewList";
import Items from "./components/Items";
import AddItem from "./components/AddItem";

import { SearchContext, ListContext, ThemeContext } from "../context";

export default function List() {
  const { pendingList } = useContext(ListContext);
  return (
    <>
      {pendingList?.length < 1 ? (
        <div className={css.container}>
          <NewList />
        </div>
      ) : (
        <Todo />
      )}
    </>
  );
}

function Todo() {
  const [searchValue, setSearchValue] = useState("");
  const [subSearchValue, setSubSearchValue] = useState("");
  const [showItemInput, setShowItemInput] = useState(false);
  const [searchType, setSearchType] = useState("default");
  const [searchResults, setSearchResults] = useState("");
  const { theme } = useContext(ThemeContext);
  const { pendingList } = useContext(ListContext);

  const filterValue = useCallback((list, key, value) => {
    return list.filter((item) => {
      if (item.subList[0]) {
        filterValue(item.subList, key, value);
      }

      return (
        item[key].toLowerCase() === value.toLowerCase() ||
        item[key].toLowerCase().includes(value.toLowerCase())
      );
    });
  }, []);

  useEffect(() => {
    if (searchValue) {
      const results = filterValue(pendingList, "title", searchValue);
      setSearchResults((results[0] && results) || "查無結果");
      if (!results[0]) {
        setTimeout(() => {
          setSearchResults("");
          setSearchValue("");
          setSubSearchValue("");
        }, 3000);
      }
    } else {
      setSearchResults("");
    }
  }, [searchValue, subSearchValue, pendingList, filterValue]);

  const handleToggle = () => setShowItemInput(!showItemInput);

  return (
    <div>
      <SearchContext.Provider
        value={{
          searchType,
          setSearchType,
          searchValue,
          setSearchValue,
          subSearchValue,
          setSubSearchValue,
          searchResults,
        }}
      >
        <Search showItemInput={showItemInput} handleToggle={handleToggle} />
        <Items />
        {!showItemInput && (
          <div className={classnames(css.buttonBottom, theme)}>
            <AddItem handleButton={handleToggle} />
          </div>
        )}
      </SearchContext.Provider>
    </div>
  );
}
