import React, { useState, useEffect } from "react";

const Timer = ({ completeTomato }) => {
  const timeOptions = [20, 25, 30, 35, 40];

  const [timeRange, changeRange] = useState(1200);
  const [seconds, setSeconds] = useState(timeRange);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(timeRange);
    setIsActive(false);
  };

  const secondsToMinutes = seconds => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    if (m < 10) m = "0".concat(m.toString());
    if (s < 10) s = "0".concat(s.toString());

    return [m, s];
  };

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== timeRange) {
      setSeconds(timeRange);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, timeRange]);

  return (
    <div className="container is-fluid">
      <div className="control">
        {timeOptions.map((minutes, index) => {
          let checked = false;
          if (index === 0) checked = true;

          return (
            <label className="radio" key={index}>
              <input
                type="radio"
                name="minutes"
                value={minutes}
                defaultChecked={checked}
                onChange={() => changeRange(minutes * 60)}
              />
              {minutes}
            </label>
          );
        })}
      </div>
      <div>{secondsToMinutes(seconds).join(":")}</div>
      <div>
        <button className="button" onClick={toggle}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
