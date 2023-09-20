import React, { useContext, useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { useParams, useNavigate } from "react-router-dom";
import classnames from "classnames";
import css from "../list.module.scss";

import { getDuration, getIndex } from "../../util";
import { ThemeContext, ListContext } from "../../context";

export default function ItemDetails() {
  const { theme } = useContext(ThemeContext);
  const { list, setList } = useContext(ListContext);
  const params = useParams();
  const navigate = useNavigate();

  const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
  const item = list[itemIdx];
  const [details, setDetails] = useState(list[itemIdx]?.remarks);
  const [showTimer, setShowTimer] = useState(!!item.startTime);

  useEffect(() => {
    if (list.length === 0) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const updateData = (e) => {
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    if (itemIdx !== -1) updatedList[itemIdx].remarks = e.target.value;
    setList(updatedList);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeHandler = useMemo(() => debounce(updateData, 500), []);

  const handleChange = (e) => {
    setDetails(e.target.value);
    changeHandler(e);
  };

  useEffect(() => {
    return () => changeHandler.cancel();
  }, [changeHandler]);

  const handleCompleted = (e) => {
    e.preventDefault();
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    if (itemIdx !== -1) {
      updatedList[itemIdx].status = "completed"
      updatedList[itemIdx].completionTime = new Date().getTime();
    };
    setList(updatedList);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    updatedList.splice(itemIdx, 1);
    setList(updatedList);
    navigate("/");
  };

  const startTimer = () => {
    const updatedList = [...list];
    const itemIdx = params?.itemId && getIndex(list, "id", params.itemId);
    updatedList[itemIdx].startTime = new Date().getTime();
    setShowTimer(true);
  };

  return (
    <div className={css.itemDetails}>
      <div className={css.itemInfo}>
        <div>上層任務</div>
        <div className={`gray`}>無</div> {/* upper level task */}
      </div>

      {item && item.status === "completed" && (
        <div className={css.itemInfo}>
          <div>進行時間</div>
          {showTimer && <ShowTimer startTime={item.startTime} completionTime={item.completionTime} />}
        </div>
      )}
      {item && item.status === "pending" && !showTimer && (
        <div className={css.itemInfo}>
          <div>進行時間</div>
          <div onClick={() => startTimer()} className={classnames(css.timerStart, `bg-main-${theme}`)}>開始</div>
        </div>
      )}

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

function ShowTimer({ startTime, completionTime }) {
  const [hours, minutes, seconds] = getDuration(startTime, completionTime);

  return (
    <div className={`gray`}>
      {hours || 0}時{minutes || 0}分{seconds || 0}秒
    </div>
  );
}
