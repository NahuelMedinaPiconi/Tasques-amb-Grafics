import {Tasca, Category} from "./models.js";

document.addEventListener("DOMContentLoaded", function() {

    const submitTask = document.getElementById("createTask");

    submitTask.addEventListener("submit", function(event) {
        event.preventDefault;

        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const date = document.getElementById("date");
        const category = document.getElementById("category");
        const priority = document.getElementById("priority");

        
    })
})