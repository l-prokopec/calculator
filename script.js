let firstNum = "0";
let operator = null;
let secondNum = "";
let shouldReset = false;

function resizeDisplay(value) {
  const len = value.length;

  if (len <= 6) {
    display.style.fontSize = "2.5rem";
  } else if (len <= 9) {
    display.style.fontSize = "2.1rem";
  } else if (len <= 12) {
    display.style.fontSize = "1.7rem";
  } else {
    display.style.fontSize = "1.4rem";
  }
}

function setDisplay(value) {
  display.textContent = value;
  resizeDisplay(value);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  a = Number(a);
  b = Number(b);
  if (operator === "plus") {
    return add(a, b);
  } else if (operator === "minus") {
    return subtract(a, b);
  } else if (operator === "multiply") {
    return multiply(a, b);
  } else if (operator === "divide") {
    if (b === 0) return "ERROR";
    return divide(a, b);
  }
}

const display = document.querySelector(".display");
const keys = document.querySelector(".keys");

keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const key = btn.dataset.key;
  if (!key) return;
  const isDigit = key.length === 1 && key >= "0" && key <= "9";

  // handle operators
  if (["plus", "minus", "multiply", "divide"].includes(key)) {
    if (operator !== null && secondNum !== "") {
      firstNum = String(operate(firstNum, secondNum, operator));
      operator = key;
      secondNum = "";
      shouldReset = true;
      setDisplay(firstNum);
      return;
    }
    operator = key;
    shouldReset = true;
    return;
  }

  // calculate
  if (key === "equal") {
    if (operator === null || secondNum === "") return;
    firstNum = String(operate(firstNum, secondNum, operator));
    secondNum = "";
    operator = null;
    shouldReset = true;
    setDisplay(firstNum);
    return;
  }

  if (key === "ac") {
    firstNum = "0";
    secondNum = "";
    operator = null;
    shouldReset = true;
    setDisplay(firstNum);
    return;
  }

  if (key === "comma") {
    if (operator === null) {
      if (shouldReset) {
        firstNum = "0.";
        shouldReset = false;
      } else if (!firstNum.includes(".")) {
        firstNum += ".";
      }
      setDisplay(firstNum);
    } else {
      if (shouldReset) {
        secondNum = "0.";
        shouldReset = false;
      } else if (!secondNum.includes(".")) {
        secondNum += ".";
      }
      setDisplay(secondNum);
    }
    return;
  }

  if (!isDigit) return;

  // if the operator is null, edit the first number
  if (operator === null) {
    if (shouldReset) {
      firstNum = key;
      shouldReset = false;
    } else if (firstNum === "0") {
      firstNum = key;
    } else {
      firstNum += key;
    }
    setDisplay(firstNum);
  }

  // if the operator is not null, edit the second number
  else {
    if (shouldReset) {
      secondNum = key;
      shouldReset = false;
    } else if (secondNum === "") {
      secondNum = key;
    } else {
      secondNum += key;
    }
    setDisplay(secondNum);
  }
});

window.addEventListener("keydown", (e) => {
  let key = null;

  if (e.key >= "0" && e.key <= "9") {
    key = e.key;
  } else {
    switch (e.key) {
      case "+":
        key = "plus";
        break;
      case "-":
        key = "minus";
        break;
      case "*":
        key = "multiply";
        break;
      case "/":
        key = "divide";
        break;
      case "Enter":
      case "=":
        key = "equal";
        break;
      case ".":
      case ",":
        key = "comma";
        break;
      case "Delete":
        key = "ac";
        break;
      default:
        return;
    }
  }

  e.preventDefault();
  document.querySelector(`[data-key="${key}"]`)?.click();
});

