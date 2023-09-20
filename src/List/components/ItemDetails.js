import React, { useContext, useState, useEffect, useMemo } from "react";
import debounce from 'lodash.debounce';
import { useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import css from "../list.module.scss";

import { ThemeContext, ListContext } from "../../context";

const getIndex = (list, key, value) => {
  return list.findIndex((item) => {
    if (item.subList[0]) {
      getIndex(item.subList, key, value);
    }
    return item[key] === value;
  });
};

export default function ItemDetails() {
  const { theme } = useContext(ThemeContext);
  const { list, setList } = useContext(ListContext);
  const params = useParams();
  const navigate = useNavigate();

  const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
  const item = list[itemIdx];
  const [details, setDetails] = useState(list[itemIdx]?.remarks);
  
  useEffect(() => {
    if (list.length === 0) {
      navigate("/");
    }
  }, [list]);

  const updateData = (e) => {
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    if (itemIdx !== -1) updatedList[itemIdx].remarks = e.target.value;
    setList(updatedList);
  }

  const changeHandler = useMemo(() => debounce(updateData, 500), []);

  const handleChange = (e) => {
    setDetails(e.target.value);
    changeHandler(e);
  }

  useEffect(() => {
    return () => changeHandler.cancel()
  }, [changeHandler])

  const handleCompleted = (e) => {
    e.preventDefault();
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    if (itemIdx !== -1) updatedList[itemIdx].status = "completed";
    setList(updatedList);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    updatedList.splice(itemIdx, 1);
    setList(updatedList);
    navigate("/")
  }

  return (
    <div className={css.itemDetails}>
      <div className={css.itemInfo}>
        <div>上層任務</div>
        <div className={`gray`}>無</div> {/* upper level task */}
      </div>

      <div className={css.itemInfo}>
        <div>進行時間</div>
        <div className={`gray`}>1分30秒</div>
        {/* duration */}
      </div>

      <div className={css.itemInfo}>
        <div>備註</div>
      </div>

      <form name="itemDetails" onSubmit={(e) => handleCompleted(e)}>
        <textarea
          rows="10"
          columns="10"
          className={css.detailsInput}
          placeholder="輸入備註"
          onChange={(e) => handleChange(e)}
          value={details}
        />
        {item && item.status === "pending" && (
        <button
          type="submit"
          className={classnames(css.detailsButton, `bg-main-${theme}`)}
        >
          完成
        </button>
        )}
        <button
          onClick={(e) => handleDelete(e)}
          className={classnames(css.detailsButton, `bg-main-red`)}
        >
          刪除
        </button>
      </form>
    </div>
  );
}
