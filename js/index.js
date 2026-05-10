import { getMappedTasks, setTasks, getCategories, setCategories, getTasks, getFinishedTasksGraph, toggleThemeColor, getThemeColor } from "./storage.js";
import * as chart from "https://cdn.jsdelivr.net/npm/chart.js";

let tasks = getMappedTasks();
let actualChart = null;

document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;

    if (getThemeColor() == 1) {
        body.classList.add("dark");
        document.getElementById("toggle").classList.add("active");
    }

    printTasks();
    printGraph();

    const loadTasks = document.getElementById("loadTasks");
    
    document.addEventListener("click", function(event) {
        if (event.target.closest(".complete")) {
            tasks = getMappedTasks();
            printTasks();
        }
    });

    document.getElementById("toggle").addEventListener("click", function() {
        this.classList.toggle("active");
        toggleThemeColor();
        body.classList.toggle("dark");
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
        printGraph();
    }

    function filterNewTasks(newTasks) {
        for (let i = 0; i < tasks.length; i++) {
            newTasks = newTasks.filter(task => {
                return task._title != tasks[i]._title
            });
        }

        let idCount = JSON.parse((localStorage.getItem("id_count")) || "0");
        let categories = getCategories();
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

    function printGraph() {
        
        const finishedTasks = getFinishedTasksGraph();
        const ctx = document.getElementById("graph");

        if (actualChart != null) {
            actualChart.destroy();
        }
        
        actualChart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: ['Ener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juni', "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Desembre"],
            datasets: [{
                label: 'Tasques realitzades',
                data: finishedTasks,
                backgroundColor: finishedTasks.map((_, i) => 
                    i === new Date().getMonth() ? '#3b82f6' : '#93c5fd'
                ),
                borderWidth: 1
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        })
    }
}) 