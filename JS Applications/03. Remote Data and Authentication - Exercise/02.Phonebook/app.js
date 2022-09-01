function attachEvents() {
    
    document.querySelector("#btnLoad").addEventListener("click", load);
    document.querySelector("#btnCreate").addEventListener("click", create);
    document.querySelector("#phonebook").addEventListener("click", remove);

    let url = "http://localhost:3030/jsonstore/phonebook";
    let phonebook = document.querySelector("#phonebook");

    function create() {
        let name = document.querySelector("#person");
        let number = document.querySelector("#phone");

        if (name.value === "" || number.value === "") {
            return;
        }

        fetch(url, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                person: name.value.trim(),
                phone: number.value.trim(),
            }),
        })
            .then((response) => response.json())
            .catch((error) => alert(error.message));

        name.value = "";
        number.value = "";
    }

    function load() {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                phonebook.replaceChildren();

                Object.values(data).forEach((entry) => {
                    let liElement = document.createElement("li");
                    liElement.textContent = `${entry.person}: ${entry.phone}`;
                    let buttonDelete = document.createElement("button");
                    buttonDelete.textContent = "Delete";
                    buttonDelete.setAttribute("id", entry._id);
                    liElement.appendChild(buttonDelete);
                    phonebook.appendChild(liElement);
                });
            });
    }

    function remove(event) {
        let currentId = event.target.id;

        if (event.target.textContent === "Delete") {
            fetch(`${url}/${currentId}`, {
                method: "delete",
            })
                .then((response) => {
                    load();
                    return response.json();
                })
                .catch((error) => alert(error.message));
        }
    }
}

attachEvents();
