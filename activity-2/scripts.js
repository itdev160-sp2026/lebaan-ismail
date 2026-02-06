function checkAge() {
  const ageInput = document.getElementById("ageInput");
  const resultDiv = document.getElementById("result");
  const inputValue = ageInput.value.trim();

  if (inputValue === "") {
    resultDiv.textContent = "Please enter your age.";
    resultDiv.className = "invalid";
    return;
  }

  const age = Number(inputValue);

  if (isNaN(age) || age < 0) {
    resultDiv.textContent = "Please enter a valid age.";
    resultDiv.className = "invalid";
    return;
  }

  if (age < 0 || age > 100) {
    resultDiv.textContent = "Please enter a valid age.";
    resultDiv.className = "invalid";
    return;
  }

  if (age >= 18) {
    resultDiv.textContent = `You are ${age} years old, which means you are an adult!`;
    resultDiv.className = "adult";
  } else {
    resultDiv.textContent = `You are ${age} years old, which means you are a minor!`;
    resultDiv.className = "minor";
  }
}
