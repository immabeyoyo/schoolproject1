let categories = [];

document.addEventListener("DOMContentLoaded", function () {
    const categorieForm = document.getElementById("categorieForm");

    categorieForm.addEventListener("submit", function (event) {
        console.log("Form Submitted");
        event.preventDefault();
        addCategorie();
    });

    loadCategories();
    renderCategories();
});

function addCategorie() {
    const categorieInput = document.getElementById("categorieInput");
    console.log("Adding Categorie:", categorieInput.value);
    
    if (categorieInput.value.trim() !== "") {
        categories.unshift({ text: categorieInput.value, completed: false });
        categorieInput.value = "";

        saveCategories();
        renderCategories();
    }
}

function renderCategories() {
    const categorieList = document.getElementById("categorieList");
    categorieList.innerHTML = "";

    categories.forEach((categorie, index) => {
        const categorieItem = createCategorieItem(categorie, index);
        categorieList.appendChild(categorieItem);
    });
}

function createCategorieItem(categorie, index) {
    const categorieItem = document.createElement("div");
    categorieItem.classList.add("categorieItem");
    categorieItem.style.animation = "fadeIn 0.5s ease";

    const deleteButton = document.createElement("Button");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", function () {
        removeCategorie(index);
    });

    const categorieText = document.createElement("span");
    categorieText.innerText = categorie.text;

    const openButton = document.createElement("Button");
    openButton.innerText = "Open";
    openButton.addEventListener("click", function () {
        openCategorie(index);
    });

    categorieItem.appendChild(deleteButton);
    categorieItem.appendChild(categorieText);
    categorieItem.appendChild(openButton);

    return categorieItem;
}

function openCategorie(index) {

}

function removeCategorie(index) {
    categories.splice(index, 1);
    saveCategories();
    renderCategories();
}

// Remove the empty openCategorie function if it's not needed

function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadCategories() {
    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    }
}

let tasks = [];

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    loadTasks();
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        tasks.unshift({ text: taskInput.value, completed: false });
        taskInput.value = "";

        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index);
        taskList.appendChild(taskItem);
    });
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = createCategorieItem(task, index);
        categorieList.appendChild(categorieItem);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    loadTasks();
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        tasks.unshift({ text: taskInput.value, completed: false });
        taskInput.value = "";

        saveTasks();
        renderTasks();
    }
}


function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = createTaskItem(task, index);
        taskList.appendChild(taskItem);
    });
}

function moveTask(index, direction) {
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < tasks.length) {
        const movedTask = tasks.splice(index, 1)[0];
        tasks.splice(newIndex, 0, movedTask);

        saveTasks();
        renderTasks();
    }
}

function createTaskItem(task, index) {const categorieForm = document.getElementById("categorieForm");
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");
    taskItem.style.animation = "fadeIn 0.5s ease";

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.classList.toggle("completed", task.completed);

    const deleteButton = createButton("Verwijderen", () => deleteTask(index));

    const completeButton = createButton(
        task.completed ? "Herstellen" : "Voltooien", () => toggleTaskComplete(index)
    );

    const moveUpButton = createButton("Omhoog", () => moveTask(index, -1));
    const moveDownButton = createButton("Omlaag", () => moveTask(index, 1));

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(moveUpButton);
    taskItem.appendChild(moveDownButton);

    return taskItem;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", clickHandler);
    return button;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}