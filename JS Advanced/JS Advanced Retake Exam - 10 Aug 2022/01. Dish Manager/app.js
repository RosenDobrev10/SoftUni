window.addEventListener("load", solve);

function solve() {
  const firstNameElement = document.querySelector("#first-name");
  const lastNameElement = document.querySelector("#last-name");
  const ageElement = document.querySelector("#age");
  const genderElement = document.querySelector("#genderSelect");
  const dishDescriptionElement = document.querySelector("#task");

  const submitButton = document.querySelector("#form-btn");
  submitButton.addEventListener("click", submit);

  function submit() {
    if (
      firstNameElement.value === "" ||
      lastNameElement.value === "" ||
      ageElement.value === "" ||
      dishDescriptionElement.value === ""
    ) {
      return;
    }

    const ulProgressElement = document.querySelector("#in-progress");
    const ulFinishedElement = document.querySelector("#finished");
    const progressCountElement = document.querySelector("#progress-count");
    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const age = ageElement.value;
    const dishDescription = dishDescriptionElement.value;
    const gender = genderElement.value;

    const liElement = document.createElement("li");
    liElement.classList.add("each-line");

    const articleElement = document.createElement("article");

    const h4Element = document.createElement("h4");
    h4Element.textContent = `${firstName} ${lastName}`;

    const pGenderAge = document.createElement("p");
    pGenderAge.textContent = `${gender}, ${age}`;

    const pDescription = document.createElement("p");
    pDescription.textContent = `Dish description: ${dishDescription}`;

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Mark as complete";

    articleElement.appendChild(h4Element);
    articleElement.appendChild(pGenderAge);
    articleElement.appendChild(pDescription);

    liElement.appendChild(articleElement);
    liElement.appendChild(editButton);
    liElement.appendChild(completeButton);

    ulProgressElement.appendChild(liElement);

    progressCountElement.textContent = Number(progressCountElement.textContent) + 1;

    firstNameElement.value = "";
    lastNameElement.value = "";
    dishDescriptionElement.value = "";
    ageElement.value = "";

    editButton.addEventListener("click", edit);

    function edit() {
      firstNameElement.value = firstName;
      lastNameElement.value = lastName;
      dishDescriptionElement.value = dishDescription;
      ageElement.value = age;
      genderElement.value = gender;

      liElement.remove();
      progressCountElement.textContent = Number(progressCountElement.textContent) - 1;
    }

    completeButton.addEventListener("click", complete);

    function complete() {
      editButton.remove();
      completeButton.remove();
      ulFinishedElement.appendChild(liElement);
      progressCountElement.textContent = Number(progressCountElement.textContent) - 1;
    }

    const clearButton = document.querySelector("#clear-btn");
    clearButton.addEventListener("click", clear);

    function clear() {
      ulFinishedElement.innerHTML = "";
    }
  }
}
