import "./styles.css";
import { createForm, clearForm } from "./projectForm.js";

// Default is a project creation
createForm();

const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", () => {
    clearForm(); 
    createForm();
});


class Task {
    constructor(title, details, dueDate, priority) {
        title, 
        details,
        dueDate,
        priority
    }
}

// View All EL


// View Ongoing EL

// View Completed EL