window.addEventListener("load", solve);

function solve() {
    const firstNameElement = document.querySelector("#first-name");
    const lastNameElement = document.querySelector("#last-name");
    const checkInElement = document.querySelector("#date-in");
    const checkOutElement = document.querySelector("#date-out");
    const guestNumberElement = document.querySelector("#people-count");

    const nextButton = document.querySelector("#next-btn");

    nextButton.addEventListener("click", next);

    function next(e) {
        e.preventDefault();

        const firstName = firstNameElement.value;
        const lastName = lastNameElement.value;
        const checkIn = checkInElement.value;
        const checkOut = checkOutElement.value;
        const guestNumber = Number(guestNumberElement.value);

        if (
            firstNameElement.value === "" ||
            lastNameElement.value === "" ||
            checkInElement.value === "" ||
            checkOutElement.value === "" ||
            guestNumberElement.value === "" ||
            checkOut < checkIn
        ) {
            return;
        }

        const ulInfoListElement = document.querySelector(".info-list");

        const liElement = document.createElement("li");
        liElement.classList.add("reservation-content");

        const articleElement = document.createElement("article");

        const h3Element = document.createElement("h3");
        h3Element.textContent = `Name: ${firstName} ${lastName}`;

        const pCheckInElement = document.createElement("p");
        pCheckInElement.textContent = `From date: ${checkIn}`;

        const pCheckOutElement = document.createElement("p");
        pCheckOutElement.textContent = `To date: ${checkOut}`;

        const pGuestNumberElement = document.createElement("p");
        pGuestNumberElement.textContent = `For ${guestNumber} people`;

        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn");
        editButton.textContent = "Edit";

        const continueButton = document.createElement("button");
        continueButton.classList.add("continue-btn");
        continueButton.textContent = "Continue";

        articleElement.appendChild(h3Element);
        articleElement.appendChild(pCheckInElement);
        articleElement.appendChild(pCheckOutElement);
        articleElement.appendChild(pGuestNumberElement);

        liElement.appendChild(articleElement);
        liElement.appendChild(editButton);
        liElement.appendChild(continueButton);

        ulInfoListElement.appendChild(liElement);

        firstNameElement.value = "";
        lastNameElement.value = "";
        checkInElement.value = "";
        checkOutElement.value = "";
        guestNumberElement.value = "";

        nextButton.disabled = true;

        editButton.addEventListener("click", edit);

        function edit() {
            firstNameElement.value = firstName;
            lastNameElement.value = lastName;
            checkInElement.value = checkIn;
            checkOutElement.value = checkOut;
            guestNumberElement.value = guestNumber;

            nextButton.disabled = false;

            liElement.remove();
        }

        continueButton.addEventListener("click", continueFunction);

        function continueFunction() {
            const ulConfirmListElement = document.querySelector(".confirm-list");

            editButton.classList.remove("edit-btn");
            editButton.classList.add("confirm-btn");
            editButton.textContent = "Confirm";

            continueButton.classList.remove("continue-btn");
            continueButton.classList.add("cancel-btn");
            continueButton.textContent = "Cancel";

            ulConfirmListElement.appendChild(liElement);

            const h1VerificationElement = document.querySelector("#verification");

            editButton.addEventListener("click", confirm);

            function confirm() {
                liElement.remove();
                nextButton.disabled = false;
                h1VerificationElement.classList.add("reservation-confirmed");
                h1VerificationElement.textContent = "Confirmed.";

                firstNameElement.value = "";
                lastNameElement.value = "";
                checkInElement.value = "";
                checkOutElement.value = "";
                guestNumberElement.value = "";
            }

            continueButton.addEventListener("click", cancel);

            function cancel() {
                liElement.remove();
                nextButton.disabled = false;
                h1VerificationElement.classList.add("reservation-cancelled");
                h1VerificationElement.textContent = "Cancelled.";

                firstNameElement.value = "";
                lastNameElement.value = "";
                checkInElement.value = "";
                checkOutElement.value = "";
                guestNumberElement.value = "";
            }
        }
    }
}
