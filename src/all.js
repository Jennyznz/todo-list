import { allProjects } from "./projectForm.js";

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
    
    const title = document.createElement("h3");
    title.setAttribute("class", "title");
    title.textContent = project.title;

    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.textContent = project.description;

    projCol.append(title);
    projCol.append(description);
}

export { displayAll };