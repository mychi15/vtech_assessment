import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classnames from 'classnames';
import css from "../list.module.scss";

import { ListContext, SearchContext, ThemeContext } from "../../context";

export default function Items() {
  const { pendingList } = useContext(ListContext);
  const { searchResults } = useContext(SearchContext);
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={css.list}>
      <Listing list={searchResults || pendingList} theme={theme}/>
    </div>
  );
}

function Listing(props) {
  const { list, theme } = props;
  const navigate = useNavigate();
  const handleDetails = (item) => {
    navigate(`item/${item.id}`);
  };

  if (Array.isArray(list)) {
    return list.map((item) => {
      return (
        <div className={css.itemRow}>
          <div className={css.item}>
            <div className={css.itemTitle}>{item.title}</div>
            <div
              className={classnames(css.icon, `bg-main-${theme}`)}
              onClick={(item) => handleDetails(item)}
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
