import { Category } from "./models.js";

document.addEventListener("DOMContentLoaded", function() {

    printCategories(null);

    const submitCategory = document.getElementById("createCategory");

    submitCategory.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("new_category");
        const color = document.getElementById("color");

        const categories = JSON.parse(localStorage.getItem("categories") || "[]")
            .map(category => new Category(category._name, category._color));
    
        if (checkRepited(name, categories)) {
            categories.push(new Category(name.value, color.value));
            localStorage.setItem("categories", JSON.stringify(categories));

            printCategories(categories);
            name.value = ""
            color.value = "#000000"
        } else {
            alert("El nom de la categoria esta repetit!")
        }

    })

    function printCategories(categories) {

        if (categories == null) {
            categories = JSON.parse(localStorage.getItem("categories") || "[]")
                .map(category => new Category(category._name, category._color));
        }

        const base = document.getElementById("categoryList");

        base.innerHTML = "";

        categories.forEach((category, index) => {
            base.appendChild(category.printCategory())
        })
    }

    function checkRepited(name, categories) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]._name == name.value) {
                return false;
            }
        }
        return true;
    }
})