console.log("=== Activity 4: Interactive To-Do List ===");

// global variables
let tasks = [];
let taskIdCounter = 1;

console.log("\n=== Element Creation ===");

const demoDiv = document.createElement("div");
const demoSpan = document.createElement("span");
const demoButton = document.createElement("button");

console.log("Created div element:", demoDiv);
console.log("Created span element:", demoSpan);
console.log("Created button element:", demoButton);

demoDiv.textContent = "This is a demo div";
demoDiv.id = "demo-div";
demoSpan.innerHTML = "<strong>Demo span with HTML</strong>";
demoButton.textContent = "Demo Button";

console.log("Div after setting properties:", demoDiv);
console.log("Div textContent:", demoDiv.textContent);
console.log("Div id:", demoDiv.id);

console.log("\n=== Element Styling Demonstrations ===");

demoDiv.style.backgroundColor = "lightblue";
demoDiv.style.padding = "10px";
demoDiv.style.border = "1px solid blue";

console.log("Applied direct styles to demo div");

demoDiv.classList.add("demo-class");
demoDiv.classList.add("highlighted");
console.log("Added classes. ClassList:", demoDiv.classList);
console.log("Has 'demo-class':", demoDiv.classList.contains("demo-class"));

demoDiv.classList.remove("highlighted");
console.log("After removing 'highlighted':", demoDiv.classList);

demoDiv.classList.toggle("active");
console.log("After toggling 'active':", demoDiv.classList);

demoSpan.style.marginTop = "10px";
demoSpan.style.display = "block";
demoButton.style.marginTop = "10px";
demoButton.style.display = "block";

console.log("Applied spacing styles to demo span and button");

console.log("\n=== ELEMENT APPENDING DEMONSTRATIONS ===");

const outputDiv = document.getElementById("output");
console.log(
  "Output div before appending:",
  outputDiv.children.length,
  "children",
);

outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log(
  "Output div after appending:",
  outputDiv.children.length,
  "children",
);

console.log("\n=== todo list logic ===");

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  // validate task input

  if (taskText === "") {
    alert("Please enter a correct task");
    console.log("Task input is empty. Enter a task");
    return;
  }

  if (taskText.length > 100) {
    alert("Task description too long! Please shorten");
    console.log("Task description is too long. Shorten the task description");
    return;
  }

  const task = {
    id: taskIdCounter++,
    text: taskText,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);
  console.log(`Task added to tasks array: ${task.text}`);

  // const listItem = createtask
  const itemList = createTaskElement(task);

  const todoList = document.getElementById("todo-list");
  todoList.appendChild(itemList);

  taskInput.value = "";
  updateTaskStats();
}

function updateTaskStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  document.getElementById("taskCount").textContent =
    `Total Tasks: ${totalTasks}`;
  document.getElementById("totalTasks").textContent =
    `Total Tasks: ${totalTasks}`;
  document.getElementById("completedTasks").textContent =
    `Completed Tasks: ${completedTasks}`;
  document.getElementById("pendingTasks").textContent =
    `Pending Tasks: ${pendingTasks}`;

  document.getElementById("taskInput").onkeydown = function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  };
}

// create task
function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  listItem.setAttribute("data-task-id", task.id);

  const taskSpan = document.createElement("span");
  taskSpan.className = "task-text";
  taskSpan.textContent = task.text;

  const statusSpan = document.createElement("span");
  statusSpan.className = "task-status";

  // set status states
  if (task.completed) {
    listItem.classList.add("done");
    statusSpan.textContent = "Done";
    statusSpan.className += " status-done";
  } else {
    statusSpan.textContent = "Pending";
    statusSpan.className += " status-pending";
  }

  listItem.appendChild(taskSpan);
  listItem.appendChild(statusSpan);

  // event click
  listItem.addEventListener("click", function () {
    toggleTaskCompletion(task.id);
  });

  console.log(`Task created for task ID ${task.id}: ${task.text}`);
  return listItem;
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    console.log(`Task ID ${taskId} not found`);
    return;
  }

  task.completed = !task.completed;
  // log if there is a task status change
  console.log(
    `Task "${task.text}" is now ${task.completed ? "completed" : "pending"}`,
  );

  // update task element
  const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
  const statusSpan = listItem.querySelector(".task-status");

  if (task.completed) {
    listItem.classList.add("done");
    statusSpan.textContent = "\u2713 Done";
    statusSpan.className = "task-status status-done";
  } else {
    listItem.classList.remove("done");
    statusSpan.textContent = "\u23F3 Pending";
    statusSpan.className = "task-status status-pending";
  }

  updateTaskStats();
}

const initialDemo = `
    <h3>DOM Manipulation Demonstrations</h3>
    <p>Element creation examples loaded above</p>
    <p>Styling and classList demonstrations complete</p>
    <p>Ready to create and manage to-do tasks!</p>
`;

setTimeout(() => {
  document.getElementById("output").innerHTML =
    initialDemo + document.getElementById("output").innerHTML;
}, 100);
