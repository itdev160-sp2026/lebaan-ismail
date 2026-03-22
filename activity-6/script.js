console.log("=== Activity 6: Enhanced To-Do List Application ===");

// global variables
let todoState = {
  tasks: [],
  nextId: 1,
  currentFilter: "all",
};

function generateTaskId() {
  return todoState.nextId++;
}

function getCurrentTimestamp() {
  return new Date().toLocaleString();
}

function validateTaskInput(taskText) {
  const trim = taskText.trim();
  if (trim.length === 0) {
    return { valid: false, message: "Task can't be empty" };
  }
  if (trim.length > 100) {
    return {
      valid: false,
      message: "Task is too long. Please keep it under 100 characters",
    };
  }
  return { valid: true, text: trim };
}

function createTask(text, priority = "medium") {
  const validation = validateTaskInput(text);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  const task = {
    id: generateTaskId(),
    text: validation.text,
    completed: false,
    priority: priority,
    createdAt: getCurrentTimestamp(),
    completedAt: null,
  };

  return task;
}

function addTask(taskText, priority) {
  try {
    const task = createTask(taskText, priority);
    todoState.tasks.push(task);

    const taskElement = createTaskElement(task);
    document.getElementById("todo-list").appendChild(taskElement);
    updateDisplay();
    // clear task input func
  } catch (err) {
    alert(err.message);
  }
}

function deleteTask(taskId) {
  const taskIndex = todoState.tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    console.log(`Task with ID ${taskId} not found for deletion`);
    return false;
  }
  const task = todoState.tasks[taskIndex];

  if (confirm(`Are you sure you want to delete this task? "${task.text}`)) {
    if (taskElement) {
      taskElement.remove();
    }

    updateDisplay();
    return true;
  }
  return false;
}

function toggleTaskStatus(taskId) {
  const task = todoState.tasks.find((task) => task.id === taskId);

  if (!task) {
    console.error(`Task with ID ${taskId} not found`);
    return;
  }

  task.completed = !task.completed;
  task.completedAt = task.completed ? getCurrentTimestamp() : null;

  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  updateTaskElementStatus(taskElement, task);
  updateDisplay();
}

// create task
function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.className = `task-item ${task.completed ? "completed" : ""}`;
  listItem.setAttribute("data-task-id", task.id);
  listItem.setAttribute("data-priority", task.priority);

  listItem.innerHTML = `
        <div class="task-priority priority-${task.priority}"></div>
        <div class="task-text">${escapeHtml(task.text)}</div>
        <div class="task-actions">
            <button class="task-btn toggle-btn" onclick="toggleTaskStatus(${
              task.id
            })">
                ${task.completed ? "\u21B6 Undo" : "\u2713 Done"}
            </button>
            <button class="task-btn delete-btn" onclick="confirmDeleteTask(${
              task.id
            })">
                \uD83D\uDDD1 Delete
            </button>
        </div>
    `;

  listItem.addEventListener("click", function (event) {
    if (!event.target.classList.contains("task-btn")) {
      toggleTaskStatus(task.id);
    }
  });

  console.log("Created task element for:", task.text);
  return listItem;
}

function updateTaskElementStatus(taskElement, task) {
  taskElement.className = `task-item ${task.completed ? "completed" : ""}`;

  const toggleBtn = taskElement.querySelector(".toggle-btn");
  toggleBtn.textContent = task.completed ? "\u21B6 Undo" : "\u2713 Done";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateTaskStats() {
  const total = todoState.tasks.length;
  const completed = todoState.tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  document.getElementById("taskCount").textContent = `(${total} task${
    total !== 1 ? "s" : ""
  })`;
  document.getElementById("totalTasks").textContent = `Total: ${total}`;
  document.getElementById("completedTasks").textContent =
    `Completed: ${completed}`;
  document.getElementById("pendingTasks").textContent = `Pending: ${pending}`;

  console.log(
    `Stats updated - Total: ${total}, Completed: ${completed}, Pending: ${pending}`,
  );
}

function updateEmptyState() {
  const emptyState = document.getElementById("emptyState");
  const todoList = document.getElementById("todo-list");

  const visibleTasks = todoList.querySelectorAll(".task-item:not(.hidden)");
  if (visibleTasks.length === 0) {
    emptyState.classList.remove("hidden");
    if (todoState.currentFilter === "all") {
      emptyState.innerHTML =
        "<p>No tasks added yet. Start by adding a new task! \uD83D\uDCDD</p>";
    } else {
      emptyState.innerHTML = `<p>No ${todoState.currentFilter} tasks found. \uD83D\uDD0D</p>`;
    }
  } else {
    emptyState.classList.add("hidden");
  }
}

function filterTasks(filterType) {
  todoState.currentFilter = filterType;

  const taskElements = document.querySelectorAll(".task-item");

  taskElements.forEach((el) => {
    const taskId = parseInt(el.getAttribute("data-task-id"));
    const task = todoState.tasks.find((task) => task.id === taskId);

    let shouldShow = false;

    switch (filterType) {
      case "pending":
        shouldShow = !task.completed;
        break;
      case "completed":
        shouldShow = task.completed;
        break;
      case "all":
        shouldShow = true;
        break;
    }
    el.classList.toggle("hidden", !shouldShow);
  });

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-filter="${filterType}"]`)
    .classList.add("active");

  updateEmptyState();
}

function applyCurrentFilter() {
  filterTasks(todoState.currentFilter);
}

function updateDisplay() {
  updateTaskStats();
  updateEmptyState();
  applyCurrentFilter();
}

// ui funcs
function clearTaskInput() {
  document.getElementById("taskInput").value = "";
  document.getElementById("prioritySelect").value = "medium";
}

function getTaskInputValues() {
  const taskText = document.getElementById("taskInput").value;
  const priority = document.getElementById("prioritySelect").value;
  return { taskText, priority };
}

function handleAddTask() {
  const { taskText, priority } = getTaskInputValues();
  addTask(taskText, priority);
}

function confirmDeleteTask(taskId) {
  deleteTask(taskId);
}

function markAllTasksDone() {
  let changedCount = 0;

  todoState.tasks.forEach((task) => {
    if (!task.completed) {
      task.completed = true;
      task.completedAt = getCurrentTimestamp();
      changedCount++;

      const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
      updateTaskElementStatus(taskElement, task);
    }
  });
  updateDisplay();

  if (changedCount > 0) {
    alert(
      `Marked ${changedCount} task${
        changedCount !== 1 ? "s" : ""
      } as completed!`,
    );
  } else {
    alert("All tasks are already completed!");
  }
}

function deleteAllCompletedTasks() {
  const completedTasks = todoState.tasks.filter((task) => task.completed);
  if (completedTasks.length === 0) {
    alert("No completed tasks to delete!");
    return;
  }

  if (
    confirm(
      `Are you sure you want to delete all ${completedTasks.length} completed task${completedTasks.length !== 1 ? "s" : ""}?`,
    )
  ) {
    console.log(`Deleting ${completedTasks.length} completed tasks...`);

    todoState.tasks = todoState.tasks.filter((task) => !task.completed);

    completedTasks.forEach((task) => {
      const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
      if (taskElement) {
        taskElement.remove();
      }
    });

    updateDisplay();
    alert(
      `Deleted ${completedTasks.length} completed task${completedTasks.length !== 1 ? "s" : ""}!`,
    );
  }
}

function clearAllTasks() {
  if (todoState.tasks.length === 0) {
    alert("No tasks to clear!");
    return;
  }

  if (
    confirm(
      `Are you sure you want to clear all ${todoState.tasks.length} tasks? This action cannot be undone!`,
    )
  ) {
    console.log(`Clearing all ${todoState.tasks.length} tasks...`);
    todoState.tasks = [];
    document.getElementById("todo-list").innerHTML = "";

    updateDisplay();
    alert("All tasks cleared!");
  }
}

function initializeEventListeners() {
  console.log("Initializing event listeners...");

  document
    .getElementById("addTaskBtn")
    .addEventListener("click", handleAddTask);
  document
    .getElementById("taskInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        handleAddTask();
      }
    });

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      filterTasks(filter);
    });
  });

  document
    .getElementById("markAllDoneBtn")
    .addEventListener("click", markAllTasksDone);
  document
    .getElementById("deleteCompletedBtn")
    .addEventListener("click", deleteAllCompletedTasks);
  document
    .getElementById("clearAllBtn")
    .addEventListener("click", clearAllTasks);

  console.log("Event listeners initialized successfully!");
}

function initializeApp() {
  console.log("Initializing Enhanced To-Do List application...");

  initializeEventListeners();
  updateDisplay();

  document.getElementById("taskInput").focus();

  console.log("Application initialized successfully!");
  console.log(
    "Try adding tasks with different priorities and using the filter/bulk operations!",
  );
}

initializeApp();
