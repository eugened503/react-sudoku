import React from "react";
import calculateTimer from "../../utils/calculateTimer";
import "./Counter.css";

function Counter({ count }) {
  return (
    <div className="counter">
      <p className="counter__item">{calculateTimer(count)[0]}</p>
      <span>:</span>
      <p className="counter__item">{calculateTimer(count)[1]}</p>
      <span>:</span>
      <p className="counter__item">{calculateTimer(count)[2]}</p>
    </div>
  );
}

export default Counter;
