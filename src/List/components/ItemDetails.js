import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import css from "../list.module.scss";

import { ThemeContext, ListContext } from "../../context";

export default function ItemDetails() {
  const { theme } = useContext(ThemeContext);
  const { pendingList, setPendingList } = useContext(ListContext);
  const [ details, setDetails] = useState("")
  const params = useParams();
  const navigate = useNavigate();

  const getIndex = (list, key, value) => {
    return list.findIndex((item) => {
      if (item.subList[0]) {
        getIndex(item.subList, key, value);
      }
      
      return item[key] === value;
    });
  };

  const itemIdx = params?.itemId && getIndex(pendingList, "id", params.itemId);

  useEffect(() => {
    const existingRemarks = pendingList && pendingList[itemIdx]?.remarks;
    setDetails(existingRemarks)
  }, [itemIdx, pendingList])
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const remarks = details;
    const updatedList = [...pendingList];
    if (itemIdx > -1 && updatedList) {
      updatedList[itemIdx].remarks = remarks || "";
    }
    setPendingList(updatedList);
    navigate("/")
  };

  const handleChange = (e) => {
    setDetails(e.target.value)
  }

  return (
    <div className={css.itemDetails}>
      <div className={css.itemInfo}>
        <div>上層任務</div>
        <div className={`gray`}>吃飯 / 炒類</div> {/* upper level task */}
      </div>

      <div className={css.itemInfo}>
        <div>進行時間</div>
        <div className={`gray`}>1分30秒</div>
      </div>

      <div className={css.itemInfo}>
        <div>備註</div>
      </div>

      <form name="itemDetails" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          rows="10"
          columns="10"
          className={css.detailsInput}
          placeholder="輸入備註"
          onChange={(e) => {handleChange(e)}}
          value={details}
        />
        <button
          type="submit"
          className={classnames(css.detailsButton, `bg-main-${theme}`)}
        >
          完成
        </button>
        <button onClick={() => navigate("/")} className={classnames(css.detailsButton, `bg-main-red`)}>刪除</button>
      </form>
    </div>
  );
}
