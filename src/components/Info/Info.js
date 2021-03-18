import React from "react";
import "./Info.css";

function Info({ errorСounter, guessСounter }) {
  return (
    <div className="info">
      <p>Количество ошибок: {errorСounter}</p>
      <p>Угадано: {guessСounter}</p>
    </div>
  );
}

export default Info;
