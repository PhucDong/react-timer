import { useState, useRef } from "react";

const useTimer = (ini = 0) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const active = useRef();
  const refInterval = useRef();

  const startTimer = () => {
    active.current.disabled = true;
    const startTime = Math.floor(Date.now() / 1000); // time when start button is pressed

    refInterval.current = setInterval(function () {
      const nowTime = Math.floor(Date.now() / 1000); // time when the clock ticks

      let diffTime = nowTime - startTime;
      let hours = Math.floor(diffTime / 3600);
      let minutes = Math.floor((diffTime - hours * 3600) / 60);
      let seconds = diffTime - hours * 3600 - minutes * 60;

      setTime({ ...time, hours: hours, minutes: minutes, seconds: seconds });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(refInterval.current);
    active.current.disabled = false;
  };

  const resetTimer = () => {
    setTime({ ...time, hours: 0, minutes: 0, seconds: 0 });
    clearInterval(refInterval.current);
    active.current.disabled = false;
  };

  return { time, startTimer, stopTimer, resetTimer, active };
};

export default useTimer;
