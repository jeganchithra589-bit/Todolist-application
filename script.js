
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
