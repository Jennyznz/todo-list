import "./styles.css";
import { createForm, createEntry } from projectForm;

const allProjects = [];

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    // TO ADD: clear projCol();    
    createForm();

});

const submitProject = document.getElementById("submit-project");
submitProject.addEventListener("click", () => {
    // TO ADD: Extract form contents
    const proj = new Project(title, description);
    showCompleted(); // TO ADD
});

// View All EL

// View Ongoing EL

// View Completed EL

class Project {
    constructor(title, description) {
        this.title = title,
        this.description = description;
    }
    createTask() {

    }
}

class Task {
    constructor(title, details, dueDate, priority) {
        title, 
        details,
        dueDate,
        priority
    }
}

function createProject() {
    const newProj = new Project("Title", "Description");
    allProjects.push(newProj);
}