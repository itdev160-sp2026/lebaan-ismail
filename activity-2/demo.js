console.log("=== Activity 2: Operators and Control Flow ===");

console.log("\n=== ARITHMETIC OPERATORS ===");
let a = 15;
let b = 4;

console.log(`a = ${a}, b = ${b}`);
console.log(`Addition: a + b = ${a + b}`);
console.log(`Subtraction: a - b = ${a - b}`);
console.log(`Multiplication: a * b = ${a * b}`);
console.log(`Division: a / b = ${a / b}`);
console.log(`Modulus: a % b = ${a % b}`);

console.log("\nOperator Precedence:");
console.log(`2 + 3 * 4 = ${2 + 3 * 4}`);
console.log(`(2 + 3) * 4 = ${(2 + 3) * 4}`);

console.log("\n=== COMPARISON OPERATORS ===");
let x = 5;
let y = "5";
let z = 10;

console.log(`x = ${x}, y = '${y}', z = ${z}`);
console.log(`x == y: ${x == y}`);
console.log(`x === y: ${x === y}`);
console.log(`x != z: ${x != z}`);
console.log(`x !== y: ${x !== y}`);
console.log(`x > z: ${x > z}`);
console.log(`x < z: ${x < z}`);
console.log(`x >= 5: ${x >= 5}`);
console.log(`x <= 5: ${x <= 5}`);

console.log("\n=== LOGICAL OPERATORS ===");
let isAdult = true;
let hasLicense = false;
let age = 20;

console.log(`isAdult = ${isAdult}, hasLicense = ${hasLicense}, age = ${age}`);
console.log(`isAdult && hasLicense: ${isAdult && hasLicense}`);
console.log(`isAdult || hasLicense: ${isAdult || hasLicense}`);
console.log(`!hasLicense: ${!hasLicense}`);
console.log(`age >= 18 && age < 65: ${age >= 18 && age < 65}`);

console.log("\n=== CONDITIONAL STATEMENTS ===");
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

console.log("\n=== SWITCH STATEMENT ===");
let dayOfWeek = 3;

console.log(`Day Number: ${dayOfWeek}`);
switch (dayOfWeek) {
  case 1:
    console.log("It's Monday");
    break;
  case 2:
    console.log("It's Tuesday");
    break;
  case 3:
    console.log("It's Wednesday");
    break;
  case 4:
    console.log("It's Thursday");
    break;
  case 5:
    console.log("It's Friday");
    break;
  case 6:
    console.log("It's Saturday");
    break;
  case 7:
    console.log("It's Sunday");
    break;
  default:
    console.log("Invalid day number");
}

document.getElementById("output").innerHTML =
  "<h3>Check the console for operator demonstrations.</h3>";
