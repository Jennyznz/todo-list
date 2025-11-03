import "./styles.css";
import {
  createForm,
  clearForm,
  allProjects,
  Project,
  Task,
} from "./projectForm.js";
import { displayAll } from "./all.js";
import { projectView } from "./projectView.js";

function loadProjects() {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    const parsedP = JSON.parse(storedProjects);
    parsedP.forEach((projData) => {
      // Extract project properties
      const project = new Project(
        projData.title,
        projData.description,
        projData.isPriority,
        projData.dueDate,
      );

      // Extract all tasks
      projData.tasks.forEach((taskData) => {
        const task = new Task(taskData.content, taskData.isComplete);
        project.createTask(task);
      });

      allProjects.push(project);
    });
  }
}
loadProjects();

// Add new project
const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", () => {
  clearForm();
  createForm();
});

// Default is list of projects
displayAll();

// View All EL
const all = document.getElementById("all-projects");
all.addEventListener("click", () => {
  clearForm();
  displayAll();
});

updateSidebarList();

// Called every time a project is added
function updateSidebarList() {
  const projTitleList = document.getElementById("proj-title-list");
  projTitleList.textContent = " ";
  allProjects.forEach((proj) => {
    const item = document.createElement("li");
    const title = document.createElement("span");
    title.setAttribute("class", "proj-title");
    title.textContent = proj.getTitle();
    item.append(title);

    projTitleList.append(item);
    item.addEventListener("click", () => {
      clearForm();
      projectView(proj);
    });
  });
}

export { updateSidebarList };
