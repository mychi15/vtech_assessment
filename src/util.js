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
  return list.findIndex((item) => {
    if (item.subList[0]) {
      getIndex(item.subList, key, value);
    }
    return item[key] === value;
  });
};

export { getDuration, getIndex };