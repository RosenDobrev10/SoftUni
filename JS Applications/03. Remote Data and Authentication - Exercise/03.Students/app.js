let url = "http://localhost:3030/jsonstore/collections/students";
let table = document.querySelector("#results tbody");
let form = document.querySelector("form");

window.addEventListener("load", loadStudents);
form.addEventListener("submit", addStudent);

async function loadStudents() {
    try {
        let response = await fetch(url);

        if (response.status !== 200) {
            throw new Error("Error");
        }

        let data = await response.json();

        Object.values(data).forEach((record) => {
            let student = createElement("tr",
                createElement("td", record.firstName),
                createElement("td", record.lastName),
                createElement("td", record.facultyNumber),
                createElement("td", record.grade)
            );

            table.appendChild(student);
        });
    } catch (error) {
        alert(error.message);
    }
}

async function addStudent(event) {
    event.preventDefault();

    let dataForm = new FormData(form);
    let infoArr = [...dataForm.values()];

    let gradeNumber = infoArr[3].trim();

    table.replaceChildren();

    try {
        let response = await fetch(url, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                firstName: infoArr[0],
                lastName: infoArr[1],
                facultyNumber: infoArr[2],
                grade: gradeNumber,
            }),
        });

        if (response.ok === false) {
            throw new Error("Cannot create new record");
        }
        loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

function createElement(type, ...content) {
    let element = document.createElement(type);

    content.forEach((content) => {
        if (typeof content === "number" || typeof content === "string") {
            content = document.createTextNode(content);
        }
        element.appendChild(content);
    });

    return element;
}
