let categories = [];

document.addEventListener("DOMContentLoaded", function () {
    const categorieForm = document.getElementById("categorieForm");

    categorieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addCategorie();
    } );

    loadCategories();
    renderCategories();
});

function addCategorie() {
    const categorieInput = document.getElementById("categorieInput");
    
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
document.addEventListener("DOMContentLoaded", function () {
    const categorieForm = document.getElementById("categorieForm");

    categorieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addCategorie();
    });

    loadCategories();
    renderCategories();
});

