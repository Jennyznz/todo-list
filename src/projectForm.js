import { displayAll } from "./all.js";

const allProjects = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.tasks = [];
    }

    createTask(content, isComplete) {
        const task = new Task(content, isComplete);
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

}

class Task {
    constructor(content, isComplete) {
        this.content = content;
        this.isComplete = isComplete;

        // TO ADD: due date
    }

    toggleIsComplete() {
        this.isComplete = !this.isComplete;
    }

    setContent(newContent) {
        this.content = newContent;
    }
}

// Create and store a new project
function createProject() {
    // Extract form contents from the DOM
    const form = document.getElementById('project-form');
    const title = form.title.value;
    const description = form.description.value;

    const newProj = new Project(title, description);

    const allTasks = document.querySelectorAll('.one-task');
    allTasks.forEach(task => { 
        const checkbox = task.querySelector('input[type="checkbox"]')
        const isComplete = checkbox.checked;

        const text = task.querySelector('input[type="text"]');
        const content = text.value;

        console.log("Task found:", content, "Checked:", isComplete);

        // Ignore blank-space tasks
        if (content.trim() !== '') {
            newProj.createTask(content, isComplete);
        }
    });

    allProjects.push(newProj);

}

function createForm() {
    const projCol = document.getElementById("projects");

    // Form element 
    const form = document.createElement("form");
    // form.setAttribute("action", "submit");
    form.setAttribute('id', 'project-form');

    // Form content
    form.append(createEntry("title", "text", true));
    form.append(createEntry("description", "textarea", false));
    // TO ADD: Due Date
    // TO ADD: isPriority
    // TO ADD: isComplete

    // Tasks
    const list = document.createElement('ul');
    list.append(createItem("", false));
    list.append(createItem("", false));
    list.append(createItem("", false));

    // Add-tasks button
    const addTasksBtn = document.createElement("button");
    addTasksBtn.setAttribute('id', 'add-tasks-btn');
    addTasksBtn.setAttribute('type', 'button');
    addTasksBtn.textContent = 'Add Task';
    form.append(addTasksBtn);
    addTasksBtn.addEventListener("click", () => {
        list.append(createItem('', false));
    });

    form.append(list);

    // Submit button
    const submit = document.createElement("button");
    submit.type = "submit"
    submit.textContent = "Submit";
    form.append(submit);

    // Render form
    projCol.append(form);

    // Add submit btn event listener after the form exists
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        createProject();
        clearForm();

        displayAll();
    });
}

function createItem(content, isChecked) {
    const item = document.createElement('li');
    item.setAttribute('class', 'one-task');

    // Create task checkbox
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'task-check');
    input.checked = Boolean(isChecked);

    // Create task textfield
    const input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('name', 'task-text');
    input2.value = content;

    item.append(input);
    item.append(input2);

    // Create delete button
    const delBtn = document.createElement('button');
    delBtn.setAttribute('class', 'del-btn');
    delBtn.setAttribute('type', 'button');
    delBtn.textContent = 'X';
    item.append(delBtn);
    delBtn.addEventListener('click', () => {
        item.remove();
    });

    
    return item;
}
 
function createEntry(name, type, isRequired) {  
    const entry = document.createElement("div");

    // Label
    const label = document.createElement("label");
    label.setAttribute('for', name);
    label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    entry.append(label);

    // Spacing
    const brk = document.createElement("br");
    entry.append(brk);

    // Text
    if (type === "text") {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'project-' + name);
        input.setAttribute('name', name);
        input.setAttribute('required', isRequired);

        entry.append(input);
    }

    // Textarea
    if (type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.setAttribute('id', 'project-' + name);
        textarea.setAttribute('name', name);
        textarea.setAttribute('required', isRequired);

        entry.append(textarea);
    }
   
    return entry;
}

function clearForm() {
    const projCol = document.getElementById("projects");
    projCol.textContent = "";
}

export { createForm, allProjects, clearForm, createItem }; 