function solve() {
    const inputs = {
        firstName: document.getElementById("fname"),
        lastName: document.getElementById("lname"),
        email: document.getElementById("email"),
        birth: document.getElementById("birth"),
        position: document.getElementById("position"),
        salary: document.getElementById("salary"),
    };

    const addWorkerBtn = document.getElementById("add-worker");
    addWorkerBtn.addEventListener("click", addWorker);

    function addWorker(event) {
        event.preventDefault();

        const firstName = inputs.firstName.value;
        const lastName = inputs.lastName.value;
        const email = inputs.email.value;
        const birth = inputs.birth.value;
        const position = inputs.position.value;
        const salary = Number(inputs.salary.value);

        if ( firstName === "" || lastName === "" || email === "" || birth === "" || position === "" || salary === "") {
            return;
        }

        const tbody = document.getElementById("tbody");

        const tr = document.createElement("tr");

        const tdFirstName = document.createElement("td");
        tdFirstName.textContent = firstName;

        const tdLastName = document.createElement("td");
        tdLastName.textContent = lastName;

        const tdEmail = document.createElement("td");
        tdEmail.textContent = email;

        const tdBirth = document.createElement("td");
        tdBirth.textContent = birth;

        const tdPosition = document.createElement("td");
        tdPosition.textContent = position;

        const tdSalary = document.createElement("td");
        tdSalary.id = "allSalaries";
        tdSalary.textContent = salary;

        const tdButtons = document.createElement("td");

        const firedBtn = document.createElement("button");
        firedBtn.classList.add("fired");
        firedBtn.textContent = "Fired";

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";

        tbody.appendChild(tr);
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdBirth);
        tr.appendChild(tdPosition);
        tr.appendChild(tdSalary);
        tr.appendChild(tdButtons);
        tdButtons.appendChild(firedBtn);
        tdButtons.appendChild(editBtn);

        inputs.firstName.value = "";
        inputs.lastName.value = "";
        inputs.email.value = "";
        inputs.birth.value = "";
        inputs.position.value = "";
        inputs.salary.value = "";

        const sum = document.getElementById("sum");
        let totalSalaries = 0;
        const allSalaries = Array.from(document.querySelectorAll("#allSalaries"));
        allSalaries.forEach((salary) => (totalSalaries += Number(salary.textContent)));
        sum.textContent = totalSalaries.toFixed(2);

        editBtn.addEventListener("click", edit);

        function edit() {
            tr.remove();

            inputs.firstName.value = firstName;
            inputs.lastName.value = lastName;
            inputs.email.value = email;
            inputs.birth.value = birth;
            inputs.position.value = position;
            inputs.salary.value = salary;

            const sum = document.getElementById("sum");
            let totalSalaries = 0;
            const allSalaries = Array.from(document.querySelectorAll("#allSalaries"));
            allSalaries.forEach((salary) => (totalSalaries += Number(salary.textContent)));
            sum.textContent = totalSalaries.toFixed(2);
        }

        firedBtn.addEventListener("click", fired);

        function fired() {
            tr.remove();

            const sum = document.getElementById("sum");
            let totalSalaries = 0;
            const allSalaries = Array.from(document.querySelectorAll("#allSalaries"));
            allSalaries.forEach((salary) => (totalSalaries += Number(salary.textContent)));
            sum.textContent = totalSalaries.toFixed(2);
        }
    }
}
solve()
