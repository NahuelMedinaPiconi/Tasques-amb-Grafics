import { getMappedTasks, setTasks } from "./storage.js";

let tasks = getMappedTasks();

document.addEventListener("DOMContentLoaded", function() {

    printTasks();

    const loadTasks = document.getElementById("loadTasks");
    
    document.addEventListener("click", function(event) {
        if (event.target.closest(".complete")) {
            tasks = getMappedTasks();
            printTasks();
        }
    });

    loadTasks.addEventListener("submit", function(event) {
        event.preventDefault();

        const file = document.getElementById("files").value;
        if (!file == "") {
            fetch(`dades/${file}`)
            .then(response => response.json())
            .then(newTasks =>{
                filterNewTasks(newTasks);
            })
            .catch(error => {
                console.error(error)
                alert("La carrega d'arxius ha fallat");
                });
        }
    })

    function printTasks() {

        const base = document.getElementById("taskList");
        const baseUnfinished = document.getElementById("unfinishedTasks");

        base.innerHTML = "";
        baseUnfinished.innerHTML = "";

        tasks.forEach(task => {
            if (!task._finished) {
                base.appendChild(task.printTasca());
            } else {
                baseUnfinished.appendChild(task.printTasca());
            }
        })
    }

    function filterNewTasks(newTasks) {
        for (let i = 0; i < tasks.length; i++) {
            newTasks = newTasks.filter(task => {
                task._title != tasks[i]._id
            });
        }
        newTasks.forEach(task => {
            tasks.push(task)
        })
        setTasks(tasks);
        tasks = getMappedTasks();
        printTasks();
    }

})