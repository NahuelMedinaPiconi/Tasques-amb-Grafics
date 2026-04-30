import { Category } from "./models.js";

const categories = JSON.parse(localStorage.getItem("categories") || "[]");

document.addEventListener("DOMContentLoaded", function() {

    const submitCategory = document.getElementById("createCategory");

    submitCategory.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("new_category");
        const color = document.getElementById("color");
    
        if (checkRepited(name, categories)) {
            categories.push(new Category(name.value, color.value));
            localStorage.setItem("categories", JSON.stringify(categories));

            name.value = ""
            color.value = "#000000"
        } else {
            alert("El nom de la categoria esta repetit!")
        }

    })

    function checkRepited(name, categories) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]._name == name.value) {
                return false;
            }
        }
        return true;
    }
})