window.addEventListener("load", solve);

function solve() {

  const firstNameElement = document.querySelector("#first-name");
  const lastNameElement = document.querySelector("#last-name");
  const ageElement = document.querySelector("#age");
  const storyTitleElement = document.querySelector("#story-title");
  const genreElement = document.querySelector("#genre");
  const storyElement = document.querySelector("#story");
  const publishButton = document.querySelector("#form-btn");

  publishButton.addEventListener("click", publish);

  function publish() {
    if (
      firstNameElement.value === "" ||
      lastNameElement.value === "" ||
      ageElement.value === "" ||
      storyTitleElement.value === "" ||
      storyElement.value === ""
    ) {
      return;
    }

    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const age = ageElement.value;
    const storyTitle = storyTitleElement.value;
    const genre = genreElement.value;
    const story = storyElement.value;

    const ulPreview = document.querySelector("#preview-list");

    const liElement = document.createElement("li");
    liElement.classList.add("story-info");

    const articleElement = document.createElement("article");

    const h4Element = document.createElement("h4");
    h4Element.textContent = `Name: ${firstName} ${lastName}`;

    const pAgeElement = document.createElement("p");
    pAgeElement.textContent = `Age: ${age}`;

    const pTitleElement = document.createElement("p");
    pTitleElement.textContent = `Title: ${storyTitle}`;

    const pGenreElement = document.createElement("p");
    pGenreElement.textContent = `Genre: ${genre}`;

    const pStoryElement = document.createElement("p");
    pStoryElement.textContent = `${story}`;

    const saveButton = document.createElement("button");
    saveButton.classList.add("save-btn");
    saveButton.textContent = "Save Story";

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit Story";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete Story";

    articleElement.appendChild(h4Element);
    articleElement.appendChild(pAgeElement);
    articleElement.appendChild(pTitleElement);
    articleElement.appendChild(pGenreElement);
    articleElement.appendChild(pStoryElement);

    liElement.appendChild(articleElement);

    liElement.appendChild(saveButton);
    liElement.appendChild(editButton);
    liElement.appendChild(deleteButton);

    ulPreview.appendChild(liElement);

    firstNameElement.value = "";
    lastNameElement.value = "";
    ageElement.value = "";
    storyTitleElement.value = "";
    storyElement.value = "";

    publishButton.disabled = true;

    editButton.addEventListener("click", edit);

    function edit() {
      firstNameElement.value = firstName;
      lastNameElement.value = lastName;
      ageElement.value = age;
      storyTitleElement.value = storyTitle;
      genreElement.value = genre;
      storyElement.value = story;

      liElement.remove();
      publishButton.disabled = false;
    }

    saveButton.addEventListener("click", save);

    function save() {
      const mainDiv = document.querySelector("#main");
      mainDiv.innerHTML = "";
      const h1Element = document.createElement("h1");
      h1Element.textContent = "Your scary story is saved!";
      mainDiv.appendChild(h1Element);
    }

    deleteButton.addEventListener("click", deleteFunction);

    function deleteFunction() {
      liElement.remove();
      publishButton.disabled = false;
    }
  }
}
