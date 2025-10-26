
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
    
    // Display project tasks
    const list = document.createElement('ul');
    project.tasks.forEach(task => {
        list.append(createItem(task.content, task.isComplete));
    });
    projCol.append(list);

    // Add event listener for task updates
    updateTasks(project);
}

function updateTasks(project) {
    const tasks = document.querySelectorAll('.one-task');
    tasks.forEach((task, index) => {
        // Listen for changes to task completion
        const checkbox = task.querySelector('[type="checkbox"]');
        checkbox.addEventListener("click" , () => {
            project.tasks[index].toggleIsComplete();
        });
        
        // Listen for changes to task content
        const text = task.querySelector('[type="text"');
        text.addEventListener("change", () => {      // Change fires after user leaves input field, and the value has changed
            project.tasks[index].setContent(text.value);
        });
    });
}



export { projectView };