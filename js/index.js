import { getMappedTasks } from "./storage.js";

document.addEventListener("DOMContentLoaded", function() {

    printTasks();

    function printTasks() {

        const tasks = getMappedTasks();

        const base = document.getElementById("taskList");

        base.innerHTML = "";

        tasks.forEach((task, index) => {
            base.appendChild(task.printTasca())
        })
    }
})