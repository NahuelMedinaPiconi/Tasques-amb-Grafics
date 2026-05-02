import { getMappedTasks } from "./storage.js";

let tasks = getMappedTasks();

document.addEventListener("DOMContentLoaded", function() {

    printTasks();
    
    document.addEventListener("click", function(event) {
        if (event.target.closest(".complete")) {
            tasks = getMappedTasks();
            printTasks();
        }
    });

    function printTasks() {

        const base = document.getElementById("taskList");
        const baseUnfinished = document.getElementById("unfinishedTasks");

        base.innerHTML = "";
        baseUnfinished.innerHTML = "";

        tasks.forEach((task, index) => {
            if (!task._finished) {
                base.appendChild(task.printTasca());
            } else {
                baseUnfinished.appendChild(task.printTasca());
            }
        })
    }
})