import { getMappedTasks, setTasks, getCategories, setCategories } from "./storage.js";

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
        tasks = getMappedTasks();
        if (file != "") {
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
                return task._title != tasks[i]._title
            });
        }

        let idCount = JSON.parse((localStorage.getItem("id_count")) || "0");
        let categories = getCategories();
        console.log(categories);
        newTasks.forEach(task => {
            if (checkRepited(task._category._name, categories)) {
                categories.push(task._category);
            }
            task._category = task._category._name;

            task._id = idCount;
            idCount++;
            tasks.push(task)
        })
        localStorage.setItem("id_count", JSON.stringify(idCount));
        setTasks(tasks);
        setCategories(categories);
        tasks = getMappedTasks();
        printTasks();
    }

    function checkRepited(name, categories) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i]._name == name) {
                return false;
            }
        }
        return true;
    }
}) 