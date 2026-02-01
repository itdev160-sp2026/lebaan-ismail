console.log("Hello, World!");

document.getElementById("output").innerHTML = "<h2>Hello World!</h2>";

let studentName = "Lebaan Ismail";
const age = 21;
let isStudent = true;
let notAssigned;
let emptyValue = null;

console.log("Variable Values:");
console.log("Name:", studentName);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Not Assigned:", notAssigned);
console.log("Empty Value:", emptyValue);

console.log("Variable Types:");
console.log("Type of studentName:", typeof studentName);
console.log("Type of age:", typeof age);
console.log("Type of isStudent:", typeof isStudent);
console.log("Type of notAssigned:", typeof notAssigned);
console.log("Type of emptyValue:", typeof emptyValue);

console.log("Variable reassignment:");
console.log("Original studentName:", studentName);
studentName = "John Doe";
console.log("Reassigned studentName:", studentName);
