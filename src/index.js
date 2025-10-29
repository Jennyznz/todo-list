import "./styles.css";
import { createForm, clearForm, allProjects } from "./projectForm.js";
import { displayAll } from "./all.js";

// Add new project
const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener("click", () => {
        clearForm(); 
        createForm();
    });

// Default is list of projects
displayAll();

// View All EL
const all = document.getElementById("all-projects");
all.addEventListener("click", () => {
    clearForm();
    displayAll();
});

// Called every time a project is added
function updateSidebarList() {
    const projTitleList = document.getElementById("proj-title-list");
    projTitleList.textContent = " ";
    allProjects.forEach(proj => {
        const item = document.createElement("li");
        const title = document.createElement("span");
        title.setAttribute("class", "proj-title");
        title.textContent = proj.getTitle();
        item.append(title);

        projTitleList.append(item);

    });
}

export { updateSidebarList };