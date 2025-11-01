
import { allProjects, createItem, clearForm } from './projectForm.js';
import { displayAll } from './all.js';
import { updateSidebarList } from './index.js';

function projectView(project) {

    const projCol = document.getElementById('projects');

    const bdContainer = document.createElement('div');
    bdContainer.setAttribute('class', 'bd-container');

    // Back button
    const backBtn = document.createElement('button');
    backBtn.setAttribute('type', 'button');
    backBtn.setAttribute('class', 'back-btn');
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', () => {
        clearForm();
        displayAll();
    });

    // Delete project button
    const delProj = document.createElement('button');
    delProj.setAttribute('type', 'button');
    delProj.setAttribute('class', 'del-btn');
    delProj.textContent = 'Delete Project';
    delProj.addEventListener('click', () => {
        const index = allProjects.indexOf(project);
        if (index !== -1) {
            allProjects.splice(index, 1); // .splice() removes 1 element starting from 'index'
            // Remove from localStorage
            localStorage.removeItem(project.getTitle());

            // Redirects to list of all projects, if current project is deleted
            clearForm();
            updateSidebarList();
            displayAll();
        }
    });
    bdContainer.append(backBtn, delProj);
    projCol.append(bdContainer);

    const tdContainer = document.createElement('div');
    tdContainer.setAttribute('class', 'td-container');
    // Project Title
    // Edit title button
    const linebreak = document.createElement('br');
    tdContainer.append(linebreak);
    const editTitleBtn = document.createElement('button');
    editTitleBtn.textContent = 'Edit Title';
    editTitleBtn.setAttribute('type', 'button');
    editTitleBtn.setAttribute('class', 'edit-title-btn');
    tdContainer.append(editTitleBtn);

    // Display title
    const header = document.createElement("h2");
    header.setAttribute('class', 'title-display');
    header.textContent = project.title;
    tdContainer.append(header);

    // Edit title
    editTitleBtn.addEventListener('click', () => {

        // Create a text input pre-filled with current title 
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'changing-the-title');
        input.setAttribute('value', project.getTitle());

        header.replaceWith(input);
        input.focus(); // Place cursor inside text field
        
        // Saves tile when user presses Enter or exits field
        function saveTitle() {
            project.setTitle(input.value);
            header.textContent = input.value;
            input.replaceWith(header);
            updateSidebarList();
        }

        input.addEventListener('blur', saveTitle); // User exits field
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                saveTitle();
            }
        });

    });


    // Project Description
    // Edit description button
    const editDesBtn = document.createElement('button');
    editDesBtn.textContent = 'Edit Description';
    editDesBtn.setAttribute('type', 'button');
    editDesBtn.setAttribute('class', 'edit-des-btn');
    tdContainer.append(editDesBtn);

    // Display description
    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.textContent = project.description;
    tdContainer.append(description);

    // Edit description
    editDesBtn.addEventListener('click', () => {
        // Create a textarea input pre-filled with current title 
        const input = document.createElement('textarea');
        input.setAttribute('id', 'changing-the-des');
        input.value = project.getDescription();

        description.replaceWith(input);
        input.focus(); // Place cursor inside text field
        
        // Saves tile when user presses Enter or exits field
        function saveDes() {
            project.setDescription(input.value);
            description.textContent = input.value;
            input.replaceWith(description);
        }

        input.addEventListener('blur', saveDes); // User exits field
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                saveDes();
            }
        });

    });


    // High-priority feature
    const hpContainer = document.createElement('div');
    hpContainer.setAttribute('class', 'priority-container');
    // Checkbox
    const input = document.createElement('input');
    input.setAttribute('name', 'priority');
    input.setAttribute('type', 'checkbox');
    input.checked = project.getIsPriority();
    // Label
    const input2 = document.createElement('span');
    input2.textContent = " High Priority";
    hpContainer.append(input, input2);
    tdContainer.append(hpContainer);
    input.addEventListener('change', () => {
        project.setIsPriority(!project.getIsPriority());
    });

    // Due date
    const dateContainer = document.createElement('div');
    dateContainer.setAttribute('class', 'due-date')
    // Label
    const dateLabel = document.createElement('span');
    dateLabel.textContent = 'Due Date: ';
    // Input
    const dueDate = project.getDueDate();
    dateContainer.append(dateLabel, dueDate);
    tdContainer.append(dateContainer);


    const list = document.createElement('ul');
    // Create and display add-task button
    const addTasksBtn = document.createElement("button");
    addTasksBtn.setAttribute('class', 'add-tasks-btn')
    addTasksBtn.textContent = 'Add Task'
    tdContainer.append(addTasksBtn);
    addTasksBtn.addEventListener("click", () => {
        // Create blank and unchecked task
        list.append(createItem('', false));
        project.createTask('', false);
        updateTasks(project);
    });
        
    projCol.append(tdContainer);
    
    // Display project tasks
    const taskHeader = document.createElement('div');
    taskHeader.textContent = 'Tasks';
    projCol.append(taskHeader);
    project.tasks.forEach(task => {
        list.append(createItem(task.content, task.isComplete));
    });
    projCol.append(list);

    updateTasks(project);

}

// Add event listener for updates to tasks
function updateTasks(project) {

    const tasks = document.querySelectorAll('.one-task');
    tasks.forEach((task, index, arr) => {
        // Listen for changes to task completion
        const checkbox = task.querySelector('[type="checkbox"]');
        checkbox.addEventListener("click" , () => {
            project.getTasks()[index].toggleIsComplete();
        });
        
        // Listen for changes to task content
        const text = task.querySelector('[type="text"]');
        text.addEventListener("change", () => {      // Change fires after user leaves input field, and the value has changed
            project.tasks[index].setContent(text.value);
        });
    });
}


export { projectView };