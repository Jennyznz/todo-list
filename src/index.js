import "./styles.css";
import { createForm, clearForm } from "./projectForm.js";
import { displayAll } from "./all.js";

// Default is list of projects
displayAll();

// View All EL
const all = document.getElementById("all-projects");
all.addEventListener("click", () => {
    clearForm();
    displayAll();
});

// View Ongoing EL

// View Completed EL
