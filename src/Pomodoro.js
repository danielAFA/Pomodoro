import React from "react";
import CycleDisplay from "./CycleDisplay";
import Timer from "./Timer";

const Pomodoro = () => {
  return (
    <div className="section">
      <CycleDisplay />
      <Timer />
    </div>
  );
};

export default Pomodoro;
