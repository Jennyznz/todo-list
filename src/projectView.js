
import { createItem } from './projectForm.js'

function projectView(project) {

    const projCol = document.getElementById('projects');

    // Project Title
    // Edit title button
    const editTitleBtn = document.createElement('button');
    editTitleBtn.textContent = 'Edit Title';
    editTitleBtn.setAttribute('type', 'button');
    projCol.append(editTitleBtn);

    // Display title
    const header = document.createElement("h1");
    header.textContent = project.title;
    projCol.append(header);

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
        }

        input.addEventListener('blur', saveTitle); // User exits field
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                saveTitle();
            }
        });

        project.setTitle(header.textContent);
    });


    // Project Description
    // Edit description button
    const editDesBtn = document.createElement('button');
    editDesBtn.textContent = 'Edit Title';
    editDesBtn.setAttribute('type', 'button');
    projCol.append(editDesBtn);

    // Display description
    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.textContent = project.description;
    projCol.append(description);

    // Edit description
    editDesBtn.addEventListener('click', () => {

        // Create a text input pre-filled with current title 
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'changing-the-des');
        input.setAttribute('value', project.getDescription());

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


    const list = document.createElement('ul');

    // Create and display add-task button
    const addTasksBtn = document.createElement("button");
    addTasksBtn.setAttribute('id', 'add-tasks-btn')
    addTasksBtn.textContent = 'Add Task'
    projCol.append(addTasksBtn);
    addTasksBtn.addEventListener("click", () => {

        // Create blank and unchecked task
        list.append(createItem('', false));
        project.createTask('', false);
        updateTasks(project);
    });
    
    // Display project tasks
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