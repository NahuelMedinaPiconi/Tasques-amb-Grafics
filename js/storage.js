import { Category, Tasca } from "./models.js";

export function getTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem("categories"));
}

export function getMappedCategories() {
    return JSON.parse(localStorage.getItem("categories") || "[]")
        .map(category => new Category(category._name, category._color));
}

export function getMappedTasks() {
    return JSON.parse(localStorage.getItem("tasks"))
        .map(task => new Tasca(task._id, task._title, task._category, task._date, task._description, task._priority, task._finished));
}

export function setTasks(tasks) {   
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function setCategories(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
}

export function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    setTasks(task);
}

export function addCategory(category) {
    const categories = getCategories();
    categories.push(category);
    setTasks(categories);
}

export function getFinishedTasksGraph() {
    return JSON.parse(localStorage.getItem("tasks-finished")  || "[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]");
}

export function setFinishedTasksGraph(finishedTasks) {
    localStorage.setItem("tasks-finished", JSON.stringify(finishedTasks));
}