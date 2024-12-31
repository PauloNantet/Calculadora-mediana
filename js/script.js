const previousDysplay = document.querySelector("[data-previous-operand]");
const currentDysplay = document.querySelector("[data-current-operand]");
const equalsButton = document.querySelector("[data-equals]");

const deleteAll = document.querySelector("[data-all-clear]");
const deleteOne = document.querySelector("[data-delete]");

const DisplayNumber = document.querySelectorAll("[data-number]");
const DisplayOperation = document.querySelectorAll("[data-operator]");

DisplayNumber.forEach((dataNumber) => {
  
  dataNumber.addEventListener("click", () => {
    const number = dataNumber.innerHTML;
    if(currentDysplay.textContent.includes(".") && number == "."){
      return 
    }else if (currentDysplay.textContent =="" && number == "."){
      currentDysplay.textContent = "0."
    }else{
      currentDysplay.textContent += number;
    }
  });
});

DisplayOperation.forEach((dataOperation) => {
  dataOperation.addEventListener("click", () => {
    const previous = previousDysplay.textContent.slice(0, -1);
    const current = currentDysplay.textContent;
    if (current == "") {
      return;
    } else {
      if (previous != "" && current != "") {
        resultOperation();
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      } else {
        const operation = dataOperation.innerHTML;
        previousDysplay.textContent = currentDysplay.textContent + operation;
        currentDysplay.textContent = "";
      }
    }
  });
});

const resultOperation = () => {
  const previous = previousDysplay.textContent.slice(0, -1);
  const operator = previousDysplay.textContent.slice(-1);
  const current = currentDysplay.textContent;
  const _previous = parseFloat(previous);
  const _current = parseFloat(current);

  if (current == "") {
    return;
  } else {
    let result;
    switch (operator) {
      case "÷":
        result = _previous / _current;
        break;
      case "*":
        result = _previous * _current;
        break;
      case "+":
        result = _previous + _current;
        break;
      case "-":
        result = _previous - _current;
        break;
      default:
        result = "Invalid operator";
    }

    if (result !== "Invalid operator") {
      currentDysplay.textContent = result;
      previousDysplay.textContent = "";
    } else {
      return;
    }
  }
};

equalsButton.addEventListener("click", () => {
  resultOperation();
});

deleteAll.addEventListener("click", () => {
  currentDysplay.textContent = "";
  previousDysplay.textContent = "";
});

deleteOne.addEventListener("click", () => {
  currentDysplay.textContent = currentDysplay.textContent
    .toString()
    .slice(0, -1);
});
