import React from "react";
import "./DigitButton.css";

function DigitButton({ item, choiceNumber, finish, errorFlag }) {
  const handleClick = () => {
    choiceNumber(item);
  };

  return (
    <button
      className="digit-button"
      onClick={handleClick}
      disabled={finish || errorFlag}
    >
      {item}
    </button>
  );
}

export default DigitButton;
