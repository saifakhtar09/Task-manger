let editingTask = null; // Keeps track of the task being edited
const addTaskBtn = document.getElementById("add-task-btn");

document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // Load tasks from local storage
    initializeSortable(); // Enable drag-and-drop for tasks
    initializeTextAreaAutoResize(); // Enable auto-resizing of text areas
});

// Initialize sortable functionality for task lists
function initializeSortable() {
    ["todo", "in-progress", "done"].forEach(listId => {
        new Sortable(document.getElementById(listId), {
            group: "tasks",
            animation: 200,
            onEnd: function (evt) {
                removeEditButtonIfDone(evt.to.id, evt.item);
                saveTasks();
            }
        });
    });
}

// Remove edit button when task is moved to "done"
function removeEditButtonIfDone(listId, task) {
    const editButton = task.querySelector(".edit-btn");

    if (listId === "done" && editButton) {
        editButton.remove();
    } else if (!editButton) {
        const actionsContainer = task.querySelector(".task-actions");
        const newEditButton = document.createElement("button");
        newEditButton.classList.add("edit-btn");
        newEditButton.innerHTML = `<i class="bi bi-pencil"></i>`;
        newEditButton.onclick = function () {
            editTask(newEditButton);
        };
        actionsContainer.appendChild(newEditButton);
    }
}

// Enable automatic resizing of the task description text area
function initializeTextAreaAutoResize() {
    document.getElementById("task-desc").addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = `${Math.min(this.scrollHeight, 200)}px`;
    });
}

// Show or hide the task form
function toggleTaskForm(forceClose = false) {
    const form = document.getElementById("task-form");

    if (forceClose || form.style.display === "flex") {
        form.style.display = "none";
        addTaskBtn.disabled = false;
    } else {
        form.style.display = "flex";
        addTaskBtn.disabled = true;
    }
}

// Add or update a task
function addTask() {
    const titleInput = document.getElementById("task-title");
    const descInput = document.getElementById("task-desc");
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    clearError(titleInput);
    clearError(descInput);

    if (!title || !desc) {
        showError(titleInput, title ? "Please enter a description." : "Please enter a title.");
        showError(descInput, desc ? "Please enter a title." : "Please enter a description.");
        return;
    }

    const taskContainer = document.getElementById("todo");
    const task = editingTask ? editingTask : createTask(title, desc);
    task.querySelector(".task-title").textContent = title;
    task.querySelector(".task-desc").textContent = desc;

    if (!editingTask) taskContainer.appendChild(task);
    editingTask = null;

    titleInput.value = "";
    descInput.value = "";
    toggleTaskForm(true);
    saveTasks();
}

// Create a new task element
function createTask(title, desc) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
        <div class="task-actions">
            <button class="delete-btn" onclick="deleteTask(this)">
                <i class="bi bi-trash"></i>
            </button>
            <button class="edit-btn" onclick="editTask(this)">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
        <strong class="task-title">${title}</strong>
        <p class="task-desc">${desc}</p>
    `;
    task.addEventListener("click", () => showTaskDetails(task));
    return task;
}

// Edit an existing task
function editTask(button) {
    event.stopPropagation();
    editingTask = button.closest(".task");
    document.getElementById("task-title").value = editingTask.querySelector(".task-title").textContent;
    document.getElementById("task-desc").value = editingTask.querySelector(".task-desc").textContent;
    toggleTaskForm();
}

// Delete a task
function deleteTask(button) {
    event.stopPropagation();
    button.closest(".task").remove();
    saveTasks();
}

// Show expanded task details
function showTaskDetails(task) {
    const expandedContent = document.getElementById('expanded-task-content');
    expandedContent.style.display = 'block';
    expandedContent.innerHTML = `
        <h3>${task.querySelector(".task-title").textContent}</h3>
        <p>${task.querySelector(".task-desc").textContent}</p>
        <button class="close-btn" onclick="closeTaskDetails()">  
            <i class="bi bi-x-lg"></i>
        </button>
    `;
}

// Close expanded task details
function closeTaskDetails() {
    document.getElementById('expanded-task-content').style.display = 'none';
}

// Show an error message for an input field
function showError(inputElement, message) {
    inputElement.style.border = "2px solid red";
    inputElement.setAttribute("placeholder", message);
}

// Clear the error style from an input field
function clearError(inputElement) {
    inputElement.style.border = "1px solid #ccc";
    inputElement.removeAttribute("placeholder");
}

// Save tasks to localStorage
function saveTasks() {
    const lists = { "todo": [], "in-progress": [], "done": [] };
    ["todo", "in-progress", "done"].forEach(listId => {
        document.getElementById(listId).querySelectorAll(".task").forEach(task => {
            lists[listId].push({
                title: task.querySelector(".task-title").textContent,
                desc: task.querySelector(".task-desc").textContent
            });
        });
    });
    localStorage.setItem("tasks", JSON.stringify(lists));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || { "todo": [], "in-progress": [], "done": [] };
    Object.keys(storedTasks).forEach(listId => {
        const list = document.getElementById(listId);
        list.innerHTML = "";
        storedTasks[listId].forEach(taskData => {
            const task = createTask(taskData.title, taskData.desc);
            if (listId === "done") {
                const editButton = task.querySelector(".edit-btn");
                if (editButton) editButton.remove();
            }
            list.appendChild(task);
        });
    });
}
