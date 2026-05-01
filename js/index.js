import { getMappedTasks } from "./storage.js";

document.addEventListener("DOMContentLoaded", function() {

    printTasks();

    function printTasks() {

        const tasks = getMappedTasks();

        const base = document.getElementById("taskList");
        const baseUnfinished = document.getElementById("unfinishedTasks");

        base.innerHTML = "";

        tasks.forEach((task, index) => {
            if (!task._finished) {
                base.appendChild(task.printTasca());
            } else {
                baseUnfinished.appendChild(task.printTasca());
            }
        })
    }
})