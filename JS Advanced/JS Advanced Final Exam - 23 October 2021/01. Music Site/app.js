window.addEventListener("load", solve);

function solve() {
    const inputs = {
        genre: document.getElementById("genre"),
        name: document.getElementById("name"),
        author: document.getElementById("author"),
        date: document.getElementById("date"),
    };

    const addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", add);

    function add(event) {
        event.preventDefault();

        const genre = inputs.genre.value;
        const name = inputs.name.value;
        const author = inputs.author.value;
        const date = inputs.date.value;

        if (genre === "" || name === "" || author === "" || date === "") {
            return;
        }

        const divAllHits = document.querySelector(".all-hits-container");

        const divHitsInfo = document.createElement("div");
        divHitsInfo.classList.add("hits-info");

        const img = document.createElement("img");
        img.src = "./static/img/img.png";

        const h2Genre = document.createElement("h2");
        h2Genre.textContent = `Genre: ${genre}`;

        const h2Name = document.createElement("h2");
        h2Name.textContent = `Name: ${name}`;

        const h2Author = document.createElement("h2");
        h2Author.textContent = `Author: ${author}`;

        const h3Date = document.createElement("h3");
        h3Date.textContent = `Date: ${date}`;

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save song";

        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "Like song";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";

        divAllHits.appendChild(divHitsInfo);
        divHitsInfo.appendChild(img);
        divHitsInfo.appendChild(h2Genre);
        divHitsInfo.appendChild(h2Name);
        divHitsInfo.appendChild(h2Author);
        divHitsInfo.appendChild(h3Date);
        divHitsInfo.appendChild(saveBtn);
        divHitsInfo.appendChild(likeBtn);
        divHitsInfo.appendChild(deleteBtn);

        inputs.genre.value = "";
        inputs.name.value = "";
        inputs.author.value = "";
        inputs.date.value = "";

        likeBtn.addEventListener("click", like);

        function like() {
            const totalLikes = document.querySelector(".likes p");
            let likes = totalLikes.textContent.slice(-1);
            likes++;
            totalLikes.textContent = `Total Likes: ${likes}`;
            likeBtn.disabled = true;
        }

        saveBtn.addEventListener("click", save);

        function save() {
            const divSaved = document.querySelector(".saved-container");
            divSaved.appendChild(divHitsInfo);
            likeBtn.remove();
            saveBtn.remove();
        }

        deleteBtn.addEventListener("click", deleteFunction);

        function deleteFunction() {
            divHitsInfo.remove();
            divSaved.remove();
        }
    }
}
