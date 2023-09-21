import { useEffect, useState } from 'react'
import { getDuration } from '../util';

const useTimer = (startTime) => {
  const [ endTime, setEndTime ] = useState(new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() =>{
      setEndTime(new Date().getTime())
    }, 1000)

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime])
  

  return getDuration(startTime, endTime);
}

export { useTimer };