function solve() {
    const inputs = {
        firstNameElement: document.querySelector('#first-name'),
        lastNameElement: document.querySelector('#last-name'),
        checkInElement: document.querySelector('#date-in'),
        checkOutElement: document.querySelector('#date-out'),
        guestNumberElement: document.querySelector('#people-count'),
    };

    const nextButton = document.querySelector('#next-btn');
    nextButton.addEventListener('click', next);

    function next(e) {
        e.preventDefault();

        const firstName = inputs.firstNameElement.value;
        const lastName = inputs.lastNameElement.value;
        const checkIn = inputs.checkInElement.value;
        const checkOut = inputs.checkOutElement.value;
        const guestNumber = inputs.guestNumberElement.value;

        if ( firstName === '' || lastName === '' || checkIn === '' ||
            checkOut === '' || guestNumber === '' || checkOut < checkIn) {
            return;
        }

        const ulInfoListElement = document.querySelector('.info-list');
        const liElement = generateHtmlElement('li', '', ulInfoListElement, { className: 'reservation-content' });
        const articleElement = generateHtmlElement('article', '', liElement);
        const h3Element = generateHtmlElement( 'h3', `Name: ${firstName} ${lastName}`, articleElement);
        const pCheckInElement = generateHtmlElement('p', `From date: ${checkIn}`, articleElement);
        const pCheckOutElement = generateHtmlElement('p', `To date: ${checkOut}`, articleElement);
        const pGuestNumberElement = generateHtmlElement( 'p', `For ${guestNumber} people`, articleElement);
        const editButton = generateHtmlElement( 'button', 'Edit', liElement, { className: 'edit-btn' }, edit);
        const continueButton = generateHtmlElement( 'button', 'Continue', liElement, { className: 'continue-btn' }, continueFunction);

        Object.keys(inputs).map((key) => (inputs[key].value = ''));

        nextButton.disabled = true;

        function edit() {
            inputs.firstNameElement.value = firstName;
            inputs.lastNameElement.value = lastName;
            inputs.checkInElement.value = checkIn;
            inputs.checkOutElement.value = checkOut;
            inputs.guestNumberElement.value = guestNumber;

            nextButton.disabled = false;

            liElement.remove();
        }

        function continueFunction() {
            const ulConfirmListElement = document.querySelector('.confirm-list');

            editButton.classList.remove('edit-btn');
            editButton.classList.add('confirm-btn');
            editButton.textContent = 'Confirm';

            continueButton.classList.remove('continue-btn');
            continueButton.classList.add('cancel-btn');
            continueButton.textContent = 'Cancel';

            ulConfirmListElement.appendChild(liElement);

            const h1VerificationElement = document.querySelector('#verification');

            editButton.removeEventListener('click', edit);
            editButton.addEventListener('click', confirm);

            function confirm() {
                liElement.remove();
                nextButton.disabled = false;
                h1VerificationElement.classList.remove('reservation-cancelled');
                h1VerificationElement.classList.add('reservation-confirmed');
                h1VerificationElement.textContent = 'Confirmed.';
                Object.keys(inputs).map((key) => (inputs[key].value = ''));
            }

            continueButton.removeEventListener('click', continueFunction);
            continueButton.addEventListener('click', cancel);

            function cancel() {
                liElement.remove();
                nextButton.disabled = false;
                h1VerificationElement.classList.remove('reservation-confirmed');
                h1VerificationElement.classList.add('reservation-cancelled');
                h1VerificationElement.textContent = 'Cancelled.';
                Object.keys(inputs).map((key) => (inputs[key].value = ''));
            }
        }
    }

    function generateHtmlElement(type, content, parent, attributes, callback) {
        const element = document.createElement(type);
        element.textContent = content;
        parent ? parent.appendChild(element) : null;
        attributes ? Object.assign(element, attributes) : null;
        typeof callback === 'function' ? element.addEventListener('click', callback) : null;
        return element;
    }
}
