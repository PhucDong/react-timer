import { useState, useRef } from "react";

const useTimer = (ini = 0) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const active = useRef();
  const refInterval = useRef();
  const prevSeconds = useRef();
  const prevMinutes = useRef();
  const prevHours = useRef();
  // prevSeconds.current = 0;

  const startTimer = () => {
    active.current.disabled = true;
    const startTime = Math.floor(Date.now() / 1000); // time when start button is pressed

    refInterval.current = setInterval(function () {
      const nowTime = Math.floor(Date.now() / 1000); // time when the clock ticks

      console.log(24, `Start time: ${startTime}`); // 100
      console.log(25, `Now time: ${nowTime}`); // 160, 161, 162

      let diffTime = nowTime - startTime; // 60, 61, 62
      let hours = Math.floor(diffTime / 3600); // 0
      let minutes = Math.floor((diffTime - hours * 3600) / 60); // 0
      let seconds = diffTime - hours * 3600 - minutes * 60; // 0, 1, 2

      // prevSeconds.current = 5, seconds = 55
      if (prevSeconds.current) {
        seconds = prevSeconds.current + seconds;
        if (seconds === 60) {
          seconds = 0;
          minutes = 1;
          prevSeconds.current = null;
          // startTimer();
        }
      }

      setTime({
        ...time,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      // When stop the timer,
        // The current value is saved with useRef
        // Start timer again => use that saved value + current value
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(refInterval.current);
    prevSeconds.current = time.seconds;
    prevMinutes.current = time.minutes;
    prevHours.current = time.hours;
    console.log(57, prevSeconds.current);
    console.log(58, prevMinutes.current);
    console.log(59, prevHours.current);
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
