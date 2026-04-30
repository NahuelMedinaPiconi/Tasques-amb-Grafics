import { Category } from "./models.js";
import { getMappedCategories } from "./storage.js";

document.addEventListener("DOMContentLoaded", function() {

    printCategories(null);

    const submitCategory = document.getElementById("createCategory");

    submitCategory.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("new_category");
        const color = document.getElementById("color");

        const categories = getMappedCategories();
    
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
            categories = getMappedCategories();
        }

        const base = document.getElementById("categoryList");

        base.innerHTML = "";

        categories.forEach((category, index) => {
            base.appendChild(category.printCategory())
        })

        if (base.innerHTML.trim()) {
            base.style.display = "block";
        }
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