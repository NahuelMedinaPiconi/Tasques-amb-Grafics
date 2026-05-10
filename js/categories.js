import { Category } from "./models.js";
import { getMappedCategories, getThemeColor, toggleThemeColor } from "./storage.js";

document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;

    if (getThemeColor() == 1) {
        body.classList.add("dark");
        document.getElementById("toggle").classList.add("active");
    }
    printCategories(null);

    const submitCategory = document.getElementById("createCategory");

    document.getElementById("toggle").addEventListener("click", function() {
        this.classList.toggle("active");
        toggleThemeColor();
        body.classList.toggle("dark");
    });

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