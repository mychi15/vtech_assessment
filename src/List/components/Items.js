import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import css from "../list.module.scss";

import { ListContext, SearchContext, ThemeContext } from "../../context";

export default function Items() {
  const { list } = useContext(ListContext);
  const { searchResults, searchValue } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);

  const pendingList = list.filter((item) => item.status === "pending");
  const completedList = list.filter((item) => item.status === "completed");

  return (
    <div className={css.list}>
      {console.log(searchValue, "searchVAlue")}
      {searchResults ? (
        <Listing list={searchResults} />
      ) : (
        <>
          <Listing list={pendingList} />
          {completedList.length > 0 && (
            <>
              <div className={classnames(theme, css.statusTitle)}></div>
              <Listing list={completedList} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function Listing(props) {
  const { list } = props;
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleDetails = (item) => {
    navigate(`item/${item.title}/${item.id}`);
  };

  if (Array.isArray(list)) {
    return list.map((item) => {
      return (
        <div className={css.itemRow}>
          <div className={classnames(css.item, css[item.status])}>
            <div className={css.itemTitle}>{item.title}</div>
            <div
              className={classnames(css.icon, `bg-main-${theme}`)}
              onClick={() => handleDetails(item)}
            ></div>
          </div>
          <div className={classnames(css.itemBorder, `bg-main-${theme}`)}></div>
        </div>
      );
    });
  } else {
    return <div className={css.infoMessage}>{list}</div>;
  }
}
