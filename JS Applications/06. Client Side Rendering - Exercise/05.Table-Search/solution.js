import { getAllStudents } from "./api.js";
import { render } from "./node_modules/lit-html/lit-html.js";
import { search } from "./search.js";
import { studentsTemplate } from "./studentsTemplate.js";

let tableBody = document.querySelector(".container tbody");
let studentsData = await getAllStudents();
let template = studentsTemplate(Object.values(studentsData));

render(template, tableBody);

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", search);
