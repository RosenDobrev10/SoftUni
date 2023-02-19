window.addEventListener('load', solve);

function solve() {
    const inputs = {
        firstNameElement: document.querySelector('#first-name'),
        lastNameElement: document.querySelector('#last-name'),
        peopleCountElement: document.querySelector('#people-count'),
        fromDateElement: document.querySelector('#from-date'),
        daysCountElement: document.querySelector('#days-count'),
    };

    const nextButton = document.querySelector('#next-btn');
    nextButton.addEventListener('click', next);

    function next(event) {
        event.preventDefault();

        const firstName = inputs.firstNameElement.value;
        const lastName = inputs.lastNameElement.value;
        const peopleCount = inputs.peopleCountElement.value;
        const fromDate = inputs.fromDateElement.value;
        const daysCount = inputs.daysCountElement.value;

        if ( firstName === '' || lastName === '' || peopleCount === '' || fromDate === '' || daysCount === '') {
            return;
        }

        const ticketInfoList = document.querySelector('.ticket-info-list');
        const li = generateHtmlElement('li', '', ticketInfoList, { className: 'ticket' });
        const article = generateHtmlElement('article', '', li);
        const h3 = generateHtmlElement('h3', `Name: ${firstName} ${lastName}`, article);
        const p1 = generateHtmlElement('p', `From date: ${fromDate}`, article);
        const p2 = generateHtmlElement('p', `For ${daysCount} days`, article);
        const p3 = generateHtmlElement('p', `For ${peopleCount} people`, article);
        const editBtn = generateHtmlElement('button', 'Edit', li, { className: 'edit-btn' }, edit);
        const continueBtn = generateHtmlElement( 'button', 'Continue', li, { className: 'continue-btn' }, continueFn);

        Object.keys(inputs).map((key) => (inputs[key].value = ''));
        nextButton.disabled = true;

        function edit() {
            li.remove();
            nextButton.disabled = false;

            inputs.firstNameElement.value = firstName;
            inputs.lastNameElement.value = lastName;
            inputs.peopleCountElement.value = peopleCount;
            inputs.fromDateElement.value = fromDate;
            inputs.daysCountElement.value = daysCount;
        }

        function continueFn() {
            const confirmTicket = document.querySelector('.confirm-ticket');
            confirmTicket.appendChild(li);

            li.classList.remove('ticket');
            li.classList.add('ticket-content');

            editBtn.classList.remove('edit-btn');
            editBtn.classList.add('confirm-btn');
            editBtn.textContent = 'Confirm';
            editBtn.removeEventListener('click', edit);
            editBtn.addEventListener('click', confirm);

            continueBtn.classList.remove('continue-btn');
            continueBtn.classList.add('cancel-btn');
            continueBtn.textContent = 'Cancel';
            continueBtn.removeEventListener('click', continueFn);
            continueBtn.addEventListener('click', cancel);
        }

        function confirm() {
            const body = document.querySelector('#body');
            const div = document.querySelector('#main');
            div.remove();
            const h1 = generateHtmlElement('h1', 'Thank you, have a nice day!', body, {id: 'thank-you',});
            const button = generateHtmlElement('button', 'Back', body, { id: 'back-btn' }, reload);
        }

        function reload() {
            location.reload();
        }

        function cancel() {
            li.remove();
            nextButton.disabled = false;
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
