import { allProjects, clearForm} from "./projectForm.js";
import { projectView } from "./projectView.js"

function displayAll() {
    // Create header
    const projCol = document.getElementById("projects");
    const header = document.createElement("h1");
    header.textContent = "All Projects";
    projCol.append(header);

    // Display projects
    allProjects.forEach(project => {
        displayProject(project);
    });
}

function displayProject(project) {
    const projCol = document.getElementById("projects");
    
    // Create a container for the project
    const section = document.createElement("div");
    section.setAttribute('class', 'project-section');

    // Create project title element
    const title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent = project.title;

    // Create project description element
    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.textContent = project.description;

    // Add elements to the DOM
    projCol.append(section);
    section.append(title);
    section.append(description);

    // Add event listener on each project section
    section.addEventListener("click", () => {
        clearForm();
        projectView(project);
    });
}



export { displayAll };