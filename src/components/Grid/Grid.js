import React from "react";
import "./Grid.css";

function Grid({
  item,
  number,
  selectArr,
  focusNumber,
  error,
  finish,
  errorFlag,
  load,
}) {
  let idStyle;

  const handleClick = () => {
    focusNumber(number);
  };

  for (let i = 0; i < selectArr.length; i++) {
    if (selectArr[i] === number ) {
      idStyle = "box-init";
    }
  }
 

  for (let i = 0; i < error.length; i++) {
    if (error[i] === number && !load) {
      idStyle = "box-init_color";
    }
  }

  for (let i = 0; i < error.length; i++) {
    if (error[i] === number && load) {
      idStyle = "box-init_load";
    }
  }

  return (
    <button
      id={idStyle}
      className="box-init_none"
      onClick={handleClick}
      disabled={finish || errorFlag}
    >
      {item}
    </button>
  );
}

export default Grid;
