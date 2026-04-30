import {Tasca} from "./models.js";

document.addEventListener("DOMContentLoaded", function() {

    const submitTask = document.getElementById("createTask");

    submitTask.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const date = document.getElementById("date");
        const category = document.getElementById("category");
        const priority = document.getElementById("priority");

        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        if (checkRepited(title, tasks)) {
            tasks.push(new Tasca(title.value, description.value ||null, date.value || null, category.value || null, priority.value || null));
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            title.value = "";
            description.value = "";
            date.value = "";
            category.value = "";
        } else {
            alert("Aquest nom de tasca ja existeix!");
        }
    })

    function checkRepited(title, tasks) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]._title == title.value) {
                return false;
            }
        }
        return true;
    }
})