import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import Digit from "./components/Digit/Digit";
import Buttons from "./components/Buttons/Buttons";
import GridContainer from "./components/GridContainer/GridContainer";
import Info from "./components/Info/Info";
import Massage from "./components/Massage/Massage";

function App() {
  const zero = [...Array(81)].map((e, i) => i); //последовательный массив индексов для фильтрации
  const [leadArr, setLeadArr] = useState(zero); //основной массив
  const [copy, setCopy] = useState([]); //копия основного массива
  const [copyId, setCopyId] = useState([]); // копия для идентификации
  const [contrast, setContrast] = useState([]); // копия для сравнения с массивом угадывания
  const [selectArr, setSelectArr] = useState([]); // массив индексов для подсветки
  selectArr.sort(function (a, b) {
    return a - b;
  });
  let uniqueSelectArr = [...new Set(selectArr)]; // массив для подсветки без повторов
  const [indexArr, setIndexArr] = useState(null); // индекс элемента
  const [count, setCount] = useState(0); //счетчик для таймера
  let matrix = []; //общая матрица
  let error = []; //массив ошибок
  const [errorСounter, setErrorСounter] = useState(0); //счетчик ошибок
  const errorFlag = errorСounter === 3 ? true : false;
  const [victory, setVictory] = useState(null); //условие победы
  const [flagReset, setFlagReset] = useState(true); // флаг для сброса таймера
  let matchCounter = 0; // счетчик совпадений
  const [load, setLoad] = useState(true); //флаг для загрузки

  for (let i = 0; i < leadArr.length; i++) {
    if (leadArr[i] !== copy[i]) {
      error.push(i);
    }
  }

  for (let i = 0; i < zero.length; i++) {
    const index = zero[i];
    for (let j = 0; j < uniqueSelectArr.length; j++) {
      if (uniqueSelectArr[j] === index) {
        zero.splice(index, 1, "undefined");
      }
    }
  }

  for (let i = 0; i < copyId.length; i++) {
    const index = zero[i];
    if (index > -1) {
      copyId.splice(index, 1, 0);
      contrast.splice(index, 1, 0);
    }
  }

  for (let i = 0; i < contrast.length; i++) {
    if (contrast[i] === copy[i]) {
      matchCounter += 1;
    }
  }

  let guessСounter = Math.abs(81 - victory - matchCounter);
  guessСounter = victory === null ? 0 : guessСounter;
  const finish = JSON.stringify(copy) === JSON.stringify(copyId) ? true : false; //проверяем массивы на совпадения
  const timeInerval = !finish && !errorFlag && flagReset ? 1000 : null;

  function timerReset() {
    setFlagReset(true);
    setCount(0);
  }

  function start() {
    setFlagReset(false);
    setTimeout(timerReset, 100);
  }

  useInterval(() => {
    setCount(count + 1);
  }, timeInerval);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // пока остаются элементы для перетасовки....
    while (0 !== currentIndex) {
      // выбираем оставшийся элемент...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // меняем его местами с текущим элементом.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function getRandomArray(k) {
    let arr = [];
    for (let i = 1; i < k; i++) arr.push(i);
    shuffle(arr);
    return arr;
  }

  function getMatrix(mass, num) {
    matrix.push(returnArray(mass, num));
    matrix = matrix.reduce(function (a, b) {
      //развертываем массив
      return a.concat(b);
    }, []);
    let copyMatrix = matrix.slice();
    let copyMatrixId = matrix.slice();
    let contrastMatrixId = matrix.slice();
    setLeadArr(matrix);
    setCopy(copyMatrix);
    setCopyId(copyMatrixId);
    setContrast(contrastMatrixId);
  }

  function getSelectMatrix(n) {
    let newSelectArr = getRandomArray(80); // массив для подсветки
    for (let i = 0; i < newSelectArr.length; i++) {
      newSelectArr.splice(i + 1, n);
    }
    setSelectArr(newSelectArr);
  }

  function solve() {
    //открываем все клетки
    if(!load){
      setSelectArr([0, ...getRandomArray(81)]);
      setLeadArr(copy); //заливаем правильный массив
      setCopyId(copy);
    }
  }

  function createArray() {
    setErrorСounter(0); //обнуляем счетчик ошибок
    setLoad(false);
    let firstArr = getRandomArray(10); //[1, 2, 3, 4, 5, 6, 7, 8, 9];
    let secondArr = firstArr.slice(); //[4, 5, 6, 7, 8, 9, 1, 2, 3]
    let thirdArr = firstArr.slice(); //[7, 8, 9, 1, 2, 3, 4, 5, 6]
    let fourthArr = firstArr.slice(); //[2, 3, 4, 5, 6, 7, 8, 9, 1]
    let fifthArr = firstArr.slice(); //[5, 6, 7, 8, 9, 1, 2, 3, 4]
    let sixthArr = firstArr.slice(); //[8, 9, 1, 2, 3, 4, 5, 6, 7]
    let seventhArr = firstArr.slice(); //[3, 4, 5, 6, 7, 8, 9, 1, 2]
    let eighthArr = firstArr.slice(); //[6, 7, 8, 9, 1, 2, 3, 4, 5]
    let ninthArr = firstArr.slice(); //[9, 1, 2, 3, 4, 5, 6, 7, 8]
    getMatrix(thirdArr, 3);
    getMatrix(firstArr, 0);
    getMatrix(secondArr, 6);
    getMatrix(fifthArr, 5);
    getMatrix(sixthArr, 2);
    getMatrix(fourthArr, 8);
    getMatrix(eighthArr, 4);
    getMatrix(seventhArr, 7);
    getMatrix(ninthArr, 1);
  }

  function getEasyMatrix() {
    createArray();
    getSelectMatrix(1);
    start();
    setVictory(41);
  }

  function getNormalMatrix() {
    createArray();
    getSelectMatrix(3);
    start();
    setVictory(61);
  }

  function getHardMatrix() {
    createArray();
    getSelectMatrix(7);
    start();
    setVictory(71);
  }

  function returnArray(mass, k) {
    for (let i = 0; i < k; i++) {
      mass.unshift(mass.pop());
    }
    // меняем столбцы местами
    [mass[0], mass[3]] = [mass[3], mass[0]];
    [mass[3], mass[4]] = [mass[4], mass[3]];
    [mass[6], mass[7]] = [mass[7], mass[6]];
    [mass[7], mass[8]] = [mass[8], mass[7]];
    return mass;
  }

  function focusNumber(index) {
    setIndexArr(index);
  }

  function choiceNumber(num) {
    leadArr[indexArr] = num;
    copyId[indexArr] = num;
    contrast[indexArr] = num;

    if (indexArr !== null && leadArr[indexArr] !== copy[indexArr]) {
      setErrorСounter(errorСounter + 1); //считаем количество ошибок
    }

    let choiceArr = leadArr.slice();
    let choiceArrId = copyId.slice();
    let contrastId = contrast.slice();
    setLeadArr(choiceArr);
    setCopyId(choiceArrId);
    setContrast(contrastId);
    let newSelectArr = selectArr.slice();
    newSelectArr.push(indexArr);
    setSelectArr(newSelectArr); //добавляем выбранные цифры в подсветку
  }

  let massage;
  if (errorСounter === 3) {
    massage = <div>Вы проиграли!</div>;
  }

  if (victory === guessСounter) {
    massage = <div>Вы выиграли!</div>;
  }

  return (
    <div className="app">
      <Buttons
        getEasyMatrix={getEasyMatrix}
        getNormalMatrix={getNormalMatrix}
        getHardMatrix={getHardMatrix}
        solve={solve}
      />
      <Counter count={count} />
      <Massage massage={massage} />
      <GridContainer
        leadArr={leadArr}
        selectArr={selectArr}
        finish={finish}
        errorFlag={errorFlag}
        focusNumber={focusNumber}
        error={error}
        load={load}
      />
      <Digit
        choiceNumber={choiceNumber}
        finish={finish}
        errorFlag={errorFlag}
      />
      <Info errorСounter={errorСounter} guessСounter={guessСounter} />
    </div>
  );
}

export default App;
