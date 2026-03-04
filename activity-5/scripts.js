console.log("=== Activity 5: Simple Math Operations Widget ===");

console.log("\n=== Element Selection and Setup");

const number1Input = document.getElementById("number1");
const number2Input = document.getElementById("number2");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.getElementById("clear");
const resultDiv = document.getElementById("result");

console.log("Number1 input:", number1Input);
console.log("Number2 input:", number2Input);
console.log("Operation buttons:", operationButtons);
console.log("Result div:", resultDiv);

function logEventDetail(event) {
  console.log("Event Details: ");
  console.log("- Type:", event.type);
  console.log("- Target:", event.target);
  console.log("- Target tagName:", event.target.tagName);
  console.log("- Target textContent:", event.target.textContent);
  console.log("- CurrentTarget:", event.currentTarget);
}

// math operation funcs
function addNumbers(num1, num2) {
  const result = num1 + num2;
  console.log(`Addition: ${num1} + ${num2} = ${result}`);
  return result;
}

function subtractNumbers(num1, num2) {
  const result = num1 - num2;
  console.log(`Subtraction: ${num1} - ${num2} = ${result}`);
  return result;
}

function multiplyNumbers(num1, num2) {
  const result = num1 * num2;
  console.log(`Multiplication: ${num1} * ${num2} = ${result}`);
  return result;
}

function divideNumbers(num1, num2) {
  if (num2 === 0) {
    console.error("Division by zero attempted!");
    return "Error: Division by zero";
  }
  const result = num1 / num2;
  console.log(`Division: ${num1} / ${num2} = ${result}`);
  return result;
}

// input validation and result display

function validateInputs() {
  const num1 = parseFloat(number1Input.value);
  const num2 = parseFloat(number2Input.value);

  console.log(
    `Validating inputs: "${number1Input.value}" and "${number2Input.value}"`,
  );

  if (isNaN(num1) || number1Input.value.trim() === "") {
    showError("Please enter a valid first number");
    return null;
  }
  if (isNaN(num2) || number2Input.value.trim() === "") {
    showError("Please enter a valid second number");
    return null;
  }

  console.log(`Validation successful: ${num1} and ${num2}`);
  return { num1, num2 };
}

function showResult(result, operation) {
  resultDiv.textContent = `Result: ${result}`;
  resultDiv.className = "result success";
  console.log(`Displaying result: ${result} for operation: ${operation}`);
}

function showError(message) {
  resultDiv.textContent = message;
  resultDiv.className = "result error";
  console.error(`Displaying error: ${message}`);
}

function clearAll() {
  number1Input.value = "";
  number2Input.value = "";
  resultDiv.textContent = "Results will appear here";
  resultDiv.className = "result";
  console.log("Cleared all inputs and results");
}

function handleOperationClick(e) {
  console.log("\n=== Operation Button Clicked ===");
  logEventDetail(e);

  const operation = e.target.dataset.operation;
  console.log(`Operation selected: ${operation}`);

  const inputs = validateInputs();
  if (!inputs) {
    return;
  }

  const { num1, num2 } = inputs;

  let result;

  switch (operation) {
    case "add":
      result = addNumbers(num1, num2);
      showResult(result, "addition");
      break;
    case "subtract":
      result = subtractNumbers(num1, num2);
      showResult(result, "subtraction");
      break;
    case "multiply":
      result = multiplyNumbers(num1, num2);
      showResult(result, "multiplication");
      break;
    case "divide":
      result = divideNumbers(num1, num2);
      if (typeof result === "string") {
        showError(result);
      } else {
        showResult(result, "division");
      }
      break;
    default:
      console.error(`Unknown operation: ${operation}`);
      showError("Unknown operation");
  }
}

console.log("\n=== Setting up event listeners ===");

operationButtons.forEach((button) => {
  button.addEventListener("click", handleOperationClick);
  console.log(`Added click listener to ${button.textContent} button`);
});

clearButton.addEventListener("click", function (e) {
  console.log("\n=== Clear Button Clicked ===");
  logEventDetail(e);
  clearAll();
});

number1Input.addEventListener("focus", function (e) {
  console.log("Number1 input focused");
  e.target.style.backgroundColor = "#e3f2fd";
});

number1Input.addEventListener("blur", function (e) {
  console.log("Number1 input lost focus");
  e.target.style.backgroundColor = "";
});

number2Input.addEventListener("focus", function (e) {
  console.log("Number2 input focused");
  e.target.style.backgroundColor = "#e3f2fd";
});

number2Input.addEventListener("blur", function (e) {
  console.log("Number2 input lost focus");
  e.target.style.backgroundColor = "";
});

// mouseover and mouseout for operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("mouseover", function (e) {
    console.log(`Mouse over ${e.target.textContent} button`);
  });

  button.addEventListener("mouseout", function (e) {
    console.log(`Mouse out of ${e.target.textContent} button`);
  });
});

console.log("All event listeners attached successfully!");
console.log("Math operation widget initialized!");
console.log("Try entering numbers and clicking operation buttons!");
