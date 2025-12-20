let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <strong>${task.name}</strong>
            <div>📅 ${task.date || "No date"}</div>
            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Add task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const name = taskInput.value.trim();

    if (name === "") {
        alert("Please enter a task name");
        return;
    }

    tasks.push({
        name: name,
        date: dateInput.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    dateInput.value = "";
}

// Toggle completed
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Filter tasks
function filterTasks(type) {
    renderTasks(type);
}

// Initial load
renderTasks();


