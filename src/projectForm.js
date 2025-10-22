import { displayAll } from "./all.js"

const allProjects = [];

class Project {
    constructor(title, description) {
        this.title = title,
        this.description = description;
    }
    // createTask() {
    //     // TO ADD
    // }
}

// Create and store a new project
function createProject() {
    // Extract form contents from the DOM
    const form = document.getElementById('project-form');
    const title = form.title.value;
    const description = form.description.value;

    const newProj = new Project(title, description);
    allProjects.push(newProj);
}

function createForm() {
    const projCol = document.getElementById("projects");

    // form element 
    const form = document.createElement("form");
    // form.setAttribute("action", "submit");
    form.setAttribute('id', 'project-form');

    // form content
    form.append(createEntry("title", "text"));
    form.append(createEntry("description", "textarea"));
    // TO ADD: Due Date
    // TO ADD: isPriority

    // submit button
    const submit = document.createElement("button");
    submit.setAttribute('id', 'submit-project');
    submit.textContent = "Submit";
    form.append(submit);

    // add everything to column
    projCol.append(form);

    // Add submit btn event listener after the form exists
    const submitProject = document.getElementById("submit-project");
    submitProject.addEventListener("click", (e) => {
        e.preventDefault();
        createProject();
        clearForm();
        displayAll();
    });
}

function createEntry(name, type) {  // TO ADD: isRequired
    const entry = document.createElement("div");

    // label
    const label = document.createElement("label");
    label.setAttribute('for', name);
    label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    entry.append(label);

    // spacing
    const brk = document.createElement("br");
    entry.append(brk);

    // text
    if (type === "text") {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'project-' + name);
        input.setAttribute('name', name);

        entry.append(input);
    }

    // textarea
    if (type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.setAttribute('id', 'project-' + name);
        textarea.setAttribute('name', name);

        entry.append(textarea);
    }
   
    return entry;
}

function clearForm() {
    const projCol = document.getElementById("projects");
    projCol.textContent = "";
}


export { createForm, allProjects }; 