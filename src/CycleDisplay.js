import React, { useState, useEffect } from "react";

const CycleDisplay = () => {
  const [numCycles, updateNumCycles] = useState(6);
  const [cycles, updateCycles] = useState(Array(numCycles).fill(false));

  const Tomato = ({ cycle, index }) => {
    const [complete, updateComplete] = useState(cycle);
    const handleClick = () => {
      const updatedCycles = cycles;
      updatedCycles[index] = !cycles[index];
      updateCycles(updatedCycles);
      updateComplete(!complete);
      console.log(cycles);
    };

    return (
      <button className="button" onClick={handleClick}>
        <span role="img" aria-label={complete ? "tomato" : "hourglass"}>
          {complete ? "🍅" : "⏳"}
        </span>
      </button>
    );
  };

  const addTomato = () => {
    if (cycles.length < 16) {
      const currentCycles = [...cycles];
      currentCycles.push(false);
      updateCycles(currentCycles);
    }
  };
  const takeTomato = () => {
    if (cycles.length > 1) {
      const currentCycles = [...cycles];
      currentCycles.splice(cycles.length - 1);
      updateCycles(currentCycles);
    }
  };

  const completeTomato = () => {
    const replace = cycles.findIndex(tomato => tomato === false);
    const updatedCycles = [...cycles];
    updatedCycles[replace] = true;
    updateCycles(updatedCycles);
  };

  const undoTomato = () => {
    const replace = cycles.lastIndexOf(true);
    const updatedCycles = [...cycles];
    updatedCycles[replace] = false;
    updateCycles(updatedCycles);
  };

  useEffect(() => updateNumCycles(cycles.length), [cycles]);
  return (
    <div className="container is-fluid">
      {cycles.map((cycle, i) => (
        <Tomato key={i} cycle={cycle} index={i} />
      ))}
      <div className="field">
        <button className="button is-primary is-outlined" onClick={addTomato}>
          +
        </button>
        <button className="button is-primary is-outlined" onClick={takeTomato}>
          -
        </button>
        <button className="button" onClick={completeTomato}>
          Complete
        </button>
        <button className="button" onClick={undoTomato}>
          Undo
        </button>
      </div>
    </div>
  );
};

export default CycleDisplay;
