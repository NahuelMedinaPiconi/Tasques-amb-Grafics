import {Tasca} from "./models.js";
import { getTasks, setTasks, getCategories, getThemeColor, toggleThemeColor } from "./storage.js";

document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const submitTask = document.getElementById("createTask");

    if (getThemeColor() == 1) {
        body.classList.add("dark");
        document.getElementById("toggle").classList.add("active");
    }

    loadCategories();

    document.getElementById("toggle").addEventListener("click", function() {
        this.classList.toggle("active");
        toggleThemeColor();
        body.classList.toggle("dark");
    });

    submitTask.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const date = document.getElementById("date");
        const category = document.getElementById("category");
        const priority = document.getElementById("priority");

        const tasks = getTasks();

        if (checkRepited(title, tasks)) {
            tasks.push(new Tasca(null, title.value, category.value || null, date.value || null, description.value ||null, priority.value || null));
            setTasks(tasks);

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

    function loadCategories() {
        const categories = getCategories();

        const base = document.getElementById("category");

        categories.forEach((category, index) => {
        const option = document.createElement("option");
        option.value = option.textContent = category._name;

        base.appendChild(option);

        })
    }
})