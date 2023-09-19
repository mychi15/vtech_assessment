import React, { useContext } from "react";
import css from "../list.module.scss";

import { ListContext, SearchContext } from "../../context";

export default function Items() {
  const { pendingList } = useContext(ListContext);
  const { searchResults } = useContext(SearchContext);

  return (
    <div className={css.list}>
      <Listing list={searchResults || pendingList} />
    </div>
  );
}

function Listing(props) {
  const { list } = props;

  if (Array.isArray(list)) {
    return list.map(item => {
      return(
        <div>{item.title}</div>
      )
    })
  } else {
    return (
      <div>{list}</div>
    )
  }
}