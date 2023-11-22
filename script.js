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

    const categorieText = document.createElement("span");
    categorieText.innerText = categorie.text;



    categorieItem.appendChild(categorieText);


    return categorieItem;
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