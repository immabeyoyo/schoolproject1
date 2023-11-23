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

function removeCategorie(index) {
    categories.splice(index, 1);
    saveCategories();
    renderCategories();
}

function openCategorie(index) {
    
}


function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function loadCategories() {
    const savedCategories = localStorage.getItem("categories");

    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    }
}