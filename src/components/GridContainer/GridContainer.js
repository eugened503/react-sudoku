import React from "react";
import Grid from "../Grid/Grid";
import "./GridContainer.css";

function GridContainer({ leadArr, selectArr, focusNumber, error, finish, errorFlag, load }) {
  return (
    <div className="grid-container">
      <div className="grid">
        {leadArr.map((item, index) => {
          return (
            <Grid
              item={item}
              key={index}
              selectArr={selectArr}
              number={index}
              focusNumber={focusNumber}
              error={error}
              finish={finish}
              errorFlag={errorFlag}
              load={load}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GridContainer;
