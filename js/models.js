import { getCategories, setCategories, getTasks, setTasks } from "./storage.js";

export class Tasca {

    static count = JSON.parse(localStorage.getItem("id_count") || "0");

    constructor(id, title, category, date, description, priority, finished = false) {
        if (id == null) {
            id = `task-${String(Tasca.count).padStart(3, "0")}`
            Tasca.count++;
            localStorage.setItem("id_count", JSON.stringify(Tasca.count))
        }
        this._id = id;
        this._title = title;
        this._category = category;
        this._date = date;
        this._description = description;
        this._priority = priority;
        this._finished = finished;
    }

    get title() {
        return this._title;
    }

    get category() {
        return this._category;
    }

    get date() {
        return this._date;
    }

    get description() {
        return this._description;
    }

    get priority() {
        return this._priority;
    }

    get finished() {
        return this._finished;
    }

    printTasca() {

        // <div class="basic-radius flex flex-column basic-task flex-sbetween">
        //      <div class="flex flex-sbetween flex-vcenter">
        //          <p>Title</p>
        //          <span>Prioriti</span>
        //      </div>
        //      <span class="basic-radius">Category</span>
        //      <p>Date</p>
        //      <div class="flex flex-sbetween flex-vcenter">
        //      <p>description</p>
        //          <div>
        //              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        //              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        //          </div>
        //     </div>
        //</div>

        const backgroundColor = {
            "Alta": "#fecacb",
            "Mediana" : "#fdf08a",
            "Baixa" : "#bbf7d0"
        }[this._priority] || "#b6b6b6"

        const base = document.createElement("div");
        const divTop = document.createElement("div");
        const pTitle = document.createElement("p");
        const sPriority = document.createElement("span");
        const sCategory = document.createElement("span");
        const pDate = document.createElement("p");
        const divBottom = document.createElement("div");
        const pDescription = document.createElement("p");
        const divIcons = document.createElement("div");

        base.classList.add("basic-radius", "flex", "flex-column", "basic-task", "flex-sbetween");
        divTop.classList.add("flex", "flex-sbetween", "flex-vcenter");
        sCategory.classList.add("basic-radius");
        divBottom.classList.add("flex", "flex-sbetween", "flex-vcenter");

        base.style.backgroundColor = backgroundColor;

        // Aconseguir el color de la categoria
        if (this._category != null) {

            const categories = getCategories();

            let found = false;

            for (let i = 0; i < categories.length; i++) {
                if (this._category == categories[i]._name) {
                    sCategory.style.backgroundColor = categories[i]._color
                    found = true;
                    break;
                }
            }

            if (!found) {
                this._category = null;
            }
        }

        //Posarli un estil en cas de estar finalitzada
        if (this._finished) {
            base.classList.add("finished");
            pTitle.style.textDecoration = "line-through";
        }

        pTitle.textContent = this._title;
        sPriority.textContent = this._priority;
        sCategory.textContent = this._category;
        pDate.textContent = this.date;
        pDescription.textContent = this._description;
        divIcons.innerHTML += '' +
        '<svg class="complete" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' +
        '<svg class="delete" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

        const id = this._id;
        divIcons.querySelector(".delete").addEventListener("click", function() {
            const tasks = getTasks();
            for(let i = 0; i < tasks.length; i++) {
                if (tasks[i]._id == id) {
                    tasks.splice(i, 1);
                    setTasks(tasks);
                    base.remove();
                    return;
                }
            }
        })

        //Canviam l'estat de la tasca en cas de que es pulsi el boto.
        divIcons.querySelector(".complete").addEventListener("click", () => {
            this._finished = !this._finished;
            base.classList.toggle("finished");

            pTitle.style.textDecoration = base.classList.contains("finished") ? "line-through" : "none";

            const tasks = getTasks();

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i]._id == id) {
                    tasks[i]._finished = this._finished;
                    setTasks(tasks);
                    return;
                }
            }

        })

        divTop.appendChild(pTitle);
        divTop.appendChild(sPriority);

        divBottom.appendChild(pDate);
        divBottom.appendChild(divIcons);

        base.appendChild(divTop);
        base.appendChild(sCategory);
        base.appendChild(pDescription);
        base.appendChild(divBottom);

        return base;
    }
}

export class Category {

    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    printCategory() {
        //<div class="basic-category flex flex-sbetween flex-vcenter min-p">
        //      <div class="flex flex-vcenter flex-sbetween">
        //          <div class="category-color"></div>
        //          <p>Estudis</p>
        //      </div>
        //      <button class="delete-button">Eliminar</button> 
        //</div>

        const base = document.createElement("div");
        const divBase = document.createElement("div");
        const dColor = document.createElement("div");
        const pName = document.createElement("p");
        const bDelete = document.createElement("button");

        base.classList.add("basic-category", "flex", "flex-sbetween", "flex-vcenter", "min-p");
        divBase.classList.add("flex", "flex-vcenter", "flex-sbetween");
        dColor.classList.add("category-color");
        bDelete.classList.add("delete-button");

        dColor.style.backgroundColor = this._color;

        pName.textContent = this._name;
        bDelete.textContent = "Eliminar";

        const name = this._name;
        bDelete.addEventListener("click", function(event) {
            event.preventDefault();
            
            const categories = getCategories();

            for (let i = 0; i < categories.length; i++) {
                if (categories[i]._name == name) {
                    categories.splice(i, 1);
                    base.remove();
                    setCategories(categories);
                    return;
                }
            }
        })

        divBase.appendChild(dColor);
        divBase.appendChild(pName);
        base.appendChild(divBase);
        base.appendChild(bDelete);

        return base;
    }
}