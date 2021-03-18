import React from "react";
import "./Buttons.css";

function Buttons({ getEasyMatrix, getNormalMatrix, getHardMatrix, solve }) {
  return (
    <div className="button-container">
      <button
        className="button-container__item"
        onClick={getEasyMatrix}
      >
        Easy
      </button>
      <button className="button-container__item" onClick={getNormalMatrix}>
        Normal
      </button>
      <button className="button-container__item" onClick={getHardMatrix}>
        Hard
      </button>
      <button className="button-container__item" onClick={solve}>
        Solve
      </button>
    </div>
  );
}

export default Buttons;
