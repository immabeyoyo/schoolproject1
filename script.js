let categories = [];
let tasks = [];
let h1Element;

// zorgt ervoor dat de html pagina eerst is geladen voordat hij het script uitvoert.
// voert daarna de scripts uit.
document.addEventListener("DOMContentLoaded", function () {             
    const categorieForm = document.getElementById("categorieForm");
    const taskForm = document.getElementById("taskForm");
    h1Element = document.querySelector('.wrapper h1');

    categorieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addCategorie();
    });

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

    loadCategories();
    loadTasks();
    renderCategories();
    renderTasks();
});

// pakt de input van de categorieën en maakt een nieuwe categorie aan met die naam

function addCategorie() {
    const categorieInput = document.getElementById("categorieInput");

    if (categorieInput.value.trim() !== "") {
        const newCategorie = {
            text: categorieInput.value,
        };
        categories.unshift(newCategorie);
        categorieInput.value = "";
        saveCategories();
        renderCategories();

        var h1Element = document.querySelector('.wrapper h1');
        h1Element.textContent = newCategorie.text;
    }
}

// laat de categorieën zien

function renderCategories() {
    const categorieList = document.getElementById("categorieList");
    categorieList.innerHTML = "";

    categories.forEach((categorie, index) => {
        const categorieItem = createCategorieItem(categorie, index);
        categorieList.appendChild(categorieItem);
    });
}

// maakt de categorieën met deleteknop, naam en open knop 

function createCategorieItem(categorie, index) {
    const categorieItem = document.createElement("div");
    categorieItem.classList.add("categorieItem");
    categorieItem.style.animation = "fadeIn 0.5s ease";

    const deleteButton = createButton("X", () => removeCategorie(index));
    const categorieText = document.createElement("span");
    const openButton = createButton("Open", () => openCategorie(index));
    categorieText.innerText = categorie.text;

    categorieItem.appendChild(deleteButton);
    categorieItem.appendChild(categorieText);
    categorieItem.appendChild(openButton);

    return categorieItem;
}

// de functie voor het openen van de categorie
function openCategorie(index) {
    var h1Element = document.querySelector('.wrapper h1');
    h1Element.textContent = categories[index].text;
    renderTasks(index);
}

//functie voor het verwijderen van de categorie

function removeCategorie(index) {
    categories.splice(index, 1);
    saveCategories();
    renderCategories();
}

// slaat de categorieën op in json.
function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

// functie die de categoriën laad

function loadCategories() {
    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    }
}

// voeg een taak toe.

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {

        const selectedCategoryIndex = categories.findIndex(c => c.text === h1Element.textContent);

        if (selectedCategoryIndex !== -1) {
            const newTask = {
                text: taskInput.value,
                completed: false
            };
            categories[selectedCategoryIndex].tasks.unshift(newTask);
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    }
}

// laat de gemaakte taken zien

function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() !== "") {
        const selectedCategoryIndex = categories.findIndex(c => c.text === h1Element.textContent);

        if (selectedCategoryIndex !== -1) {
            const newTask = {
                text: taskInput.value,
                completed: false
            };
            categories[selectedCategoryIndex].tasks.unshift(newTask);

            // Update the tasks array
            tasks = categories.flatMap(category => category.tasks);

            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    }
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

//alle knopjes van de taken

function createTaskItem(task, index) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");
    taskItem.style.animation = "fadeIn 0.5s ease";

    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskText.classList.toggle("completed", task.completed);

    const deleteButton = createButton("Verwijderen", () => deleteTask(index));
    const completeButton = createButton(
        task.completed ? "Herstellen" : "Voltooien",
        () => toggleTaskComplete(index)
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

// wat de knopjes doen
// delete

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// voltooid
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
//slaat taken op via json
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//laad de taken via json
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}