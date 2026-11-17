## Ex03 To-Do List using JavaScript
# Date:

# AIM
To create a To-do Application with all features using JavaScript.

# ALGORITHM
STEP 1
Build the HTML structure (index.html).

STEP 2
Style the App (style.css).

STEP 3
Plan the features the To-Do App should have.

STEP 4
Create a To-do application using Javascript.

STEP 5
Add functionalities.

STEP 6
Test the App.

STEP 7
Open the HTML file in a browser to check layout and functionality.

STEP 8
Fix styling issues and refine content placement.

STEP 9
Deploy the website.

STEP 10
Upload to GitHub Pages for free hosting.

# PROGRAM
```
.html


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">

        <h1>My Todo List</h1>
        <p id="date"></p>

        <div class="input-section">
            <input type="text" id="taskInput"
                   placeholder="Enter your task...">

            <select id="priority">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
            </select>

            <button onclick="addTask()">Add Task</button>
        </div>

        <input type="text" id="searchInput"
               placeholder="Search tasks..." oninput="displayTasks()">

        <div class="filters">
            <button onclick="setFilter('all')">All</button>
            <button onclick="setFilter('active')">Active</button>
            <button onclick="setFilter('completed')">Completed</button>
        </div>

        <ul id="taskList"></ul>

        <div class="footer">
            <p id="taskCount">0 tasks remaining</p>
            <button onclick="clearCompleted()">
                Clear Completed
            </button>
        </div>

    </div>

    <script src="script.js"></script>
</body>
</html>

.js


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Display current date
document.getElementById("date").textContent =
    new Date().toDateString();

// Save tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    saveTasks();
    displayTasks();
}

// Display tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        const matchesSearch =
            task.name.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "active" && !task.completed) ||
            (currentFilter === "completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = () => toggleTask(task.id);

        const span = document.createElement("span");
        span.textContent = task.name;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        const priority = document.createElement("small");
        priority.textContent = task.priority;
        priority.className = "priority " + task.priority;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = () => deleteTask(task.id);

        li.append(
            checkbox,
            span,
            priority,
            editButton,
            deleteButton
        );

        taskList.appendChild(li);
    });

    const remaining = tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").textContent =
        remaining + " tasks remaining";
}

// Complete or uncomplete task
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newName = prompt("Edit your task:", task.name);

    if (newName !== null && newName.trim() !== "") {
        task.name = newName.trim();

        saveTasks();
        displayTasks();
    }
}

// Delete task
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        displayTasks();
    }
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    displayTasks();
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();
}

// Initial display
displayTasks();


.css


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: white;
    width: 100%;
    max-width: 550px;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
}

#date {
    text-align: center;
    color: gray;
    margin-bottom: 20px;
}

.input-section {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
}

input, select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    min-width: 0;
}

.input-section input {
    flex: 1;
}

#searchInput {
    width: 100%;
    margin-bottom: 15px;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 11px 14px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #4c5fd5;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

#taskList {
    list-style: none;
}

#taskList li {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f4f4f8;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 7px;
}

.task-text {
    flex: 1;
    overflow-wrap: anywhere;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.priority {
    font-size: 11px;
    font-weight: bold;
}

.High { color: red; }
.Medium { color: orange; }
.Low { color: green; }

.delete {
    background: #e74c3c;
}

.edit {
    background: #f39c12;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

@media (max-width: 480px) {
    .input-section {
        flex-wrap: wrap;
    }

    .footer {
        flex-direction: column;
    }
}

```
# OUTPUT

![alt text](<Screenshot 2026-11-17 173705.png>)

# RESULT
The program for creating To-do list using JavaScript is executed successfully.