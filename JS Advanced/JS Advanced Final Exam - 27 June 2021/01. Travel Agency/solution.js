window.addEventListener("load", solution);

function solution() {
  
  const inputFullName = document.getElementById("fname");
  const inputEmail = document.getElementById("email");
  const inputPhone = document.getElementById("phone");
  const inputAddress = document.getElementById("address");
  const inputCode = document.getElementById("code");

  const submitBtn = document.getElementById("submitBTN");
  submitBtn.addEventListener("click", submit);

  function submit(event) {
    event.preventDefault();

    const fullName = inputFullName.value;
    const email = inputEmail.value;
    const phone = inputPhone.value;
    const address = inputAddress.value;
    const code = inputCode.value;

    if (fullName === "" || email === "") {
      return;
    }

    const infoPreview = document.getElementById("infoPreview");

    const liFullName = document.createElement("li");
    liFullName.textContent = `Full Name: ${fullName}`;

    const liEmail = document.createElement("li");
    liEmail.textContent = `Email: ${email}`;

    const liPhone = document.createElement("li");
    liPhone.textContent = `Phone Number: ${phone}`;

    const liAdress = document.createElement("li");
    liAdress.textContent = `Address: ${address}`;

    const liCode = document.createElement("li");
    liCode.textContent = `Postal Code: ${code}`;

    infoPreview.appendChild(liFullName);
    infoPreview.appendChild(liEmail);
    infoPreview.appendChild(liPhone);
    infoPreview.appendChild(liAdress);
    infoPreview.appendChild(liCode);

    inputFullName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    inputAddress.value = "";
    inputCode.value = "";

    submitBtn.disabled = true;

    const editBtn = document.getElementById("editBTN");
    const continueBtn = document.getElementById("continueBTN");
    editBtn.disabled = false;
    continueBtn.disabled = false;

    editBtn.addEventListener("click", edit);

    function edit() {
      inputFullName.value = fullName;
      inputEmail.value = email;
      inputPhone.value = phone;
      inputAddress.value = address;
      inputCode.value = code;

      editBtn.disabled = true;
      continueBtn.disabled = true;
      submitBtn.disabled = false;

      Array.from(infoPreview.childNodes).forEach((child) => child.remove());
    }

    continueBtn.addEventListener("click", continueFunction);

    function continueFunction() {
      let divBlock = document.getElementById("block");

      Array.from(divBlock.childNodes).forEach((child) => child.remove());

      const h3Message = document.createElement("h3");
      h3Message.textContent = `Thank you for your reservation!`;

      divBlock.appendChild(h3Message);
    }
  }
}
