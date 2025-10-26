
import { createItem } from './projectForm.js'

function projectView(project) {

    const projCol = document.getElementById('projects');

    // Display project title
    const header = document.createElement("h1");
    header.textContent = project.title;
    projCol.append(header);

    // Display project description
    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.textContent = project.description;
    projCol.append(description);

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