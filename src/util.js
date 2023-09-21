const getDuration = (startTime, endTime) => {
  const countDown = endTime - startTime;
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [hours, minutes, seconds];
};

const getIndex = (list, key, value) => {
  if (!key || !value) return -1;
  return list.findIndex((item) => {
    if (item.subList[0]) {
      getIndex(item.subList, key, value);
    }
    return item[key] === value;
  });
};

const updateList = (state, findIndexKey, findIndexValue, callBack, ...args) => {
  const objToUpdate = [...args];
  const updatedState = [...state];
  const itemIdx = getIndex(state, findIndexKey, findIndexValue);
  const item = updatedState[itemIdx];

  if (objToUpdate.length === 0) {
    updatedState.splice(itemIdx, 1);
  } else {
    objToUpdate.forEach((obj) => {
      const [key, value] = Object.entries(obj)[0];
      if (item) item[key] = value;
    });
  }
  return () => callBack(updatedState);
};

const getLocalData = (key, defaultData) => {
  return JSON.parse(localStorage.getItem(key)) || defaultData;
};

export { getDuration, getIndex, updateList, getLocalData };
