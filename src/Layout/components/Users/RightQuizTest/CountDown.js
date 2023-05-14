import { useState, useEffect } from "react";

const CountDown = ({ onTimeUp, statusCount }) => {
  const [count, setCount] = useState(300);

  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds; // Return is HH : MM : SS
  }

  useEffect(() => {
    if (statusCount === true) {
      const timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }

    if (count === 0) {
      onTimeUp();
      return;
    }
  }, [count]);

  return (
    <div>
      <div>{convertHMS(count)}</div>
    </div>
  );
};
export default CountDown;
