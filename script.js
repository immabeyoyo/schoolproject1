let categories = [];

document.addEventListener("DOMContentLoaded", function () {
    const categorieForm = document.getElementById("categorieForm");

    categorieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addCategorie();
    });

    renderCategories();
});

function addCategorie() {
    const categorieInput = document.getElementById("categorieInput");
    
    if (categorieInput.value.trim() !== "") {
        categories.unshift({ text: categorieInput.value, completed: false });
        categorieInput.value = "";

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

    const moveUpButton = createButton("Omhoog", () => moveTask(index, -1));
    const moveDownButton = createButton("Omlaag", () => moveTask(index, 1));

    categorieItem.appendChild(categorieText);
    categorieItem.appendChild(moveUpButton);
    categorieItem.appendChild(moveDownButton);

    return categorieItem;
}

