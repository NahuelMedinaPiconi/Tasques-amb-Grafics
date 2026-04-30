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