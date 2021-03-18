import React from "react";
import DigitButton from "../DigitButton/DigitButton";

function Digit({ choiceNumber, finish, errorFlag }) {
  let arrDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid-container grid-container__margin">
      <div className="grid-init grid">
        {arrDigit.map((item, index) => {
          return (
            <DigitButton
              key={index}
              item={item}
              choiceNumber={choiceNumber}
              finish={finish}
              errorFlag={errorFlag}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Digit;
