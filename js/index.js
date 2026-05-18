import { getMappedTasks, setTasks, getCategories, setCategories, getTasks, getFinishedTasksGraph, toggleThemeColor, getThemeColor } from "./storage.js";
import { printGraph } from "./grafics.js";
import * as chart from "https://cdn.jsdelivr.net/npm/chart.js";

let tasks = getMappedTasks();
let actualChart = null;

document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const ctx = document.getElementById("graph").getContext("2d");

    if (getThemeColor() == 1) {
        body.classList.add("dark");
        document.getElementById("toggle").classList.add("active");
    }

    printTasks();
    actualChart = printGraph(actualChart, ctx);

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
            .then(response => {

                const type = response.headers.get("content-type") || "";

                if (type && type.includes("application/json")) {
                    return response.json() .then(newTasks => filterNewTasks(newTasks));
                } else if (type && type.includes("application/xml") || type.includes("text/xml")) {
                    return response.text() .then(newTasks => filterNewXMLTasks(newTasks))
                } else {
                    throw new Error("L'extensió de l'arxiu ha fallat.");
                }
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
        actualChart = printGraph( actualChart, ctx);
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

    function filterNewXMLTasks(xmlTasks) {
        const tasks = new DOMParser().parseFromString(xmlTasks, "application/xml")

        const parseError = xml.querySelector("parsererror");
        if (parseError) throw new Error("El xml no es correcte");

        const xmlTasks = [...xml.querySelectorAll("task")].map(task => ({
        _id: task.getAttribute("id"),
        _title: task.querySelector("title").textContent,
        _description: task.querySelector("description").textContent,
        _date: task.querySelector("date").textContent,
        _priority: task.getAttribute("importance"),
        _finished: task.getAttribute("is_done") === "true",
        _category: {
            _name: task.querySelector("category > name").textContent,
            _color: task.querySelector("category > color").textContent,
        }
        }));

        filterNewTasks(xmlTasks);
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