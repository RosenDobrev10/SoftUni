window.addEventListener('load', solve);

function solve() {
    const inputs = {
        firstNameElement: document.querySelector('#first-name'),
        lastNameElement: document.querySelector('#last-name'),
        ageElement: document.querySelector('#age'),
        genderElement: document.querySelector('#genderSelect'),
        dishDescriptionElement: document.querySelector('#task'),
    };

    const submitButton = document.querySelector('#form-btn');
    submitButton.addEventListener('click', submit);

    function submit() {
        const inputFields = Array.from(document.querySelectorAll('label > input'))
            .map((input) => input.value)
            .concat([inputs.genderElement.value, inputs.dishDescriptionElement.value]);
        const [firstName, lastName, age, gender, dishDescription] = inputFields;
        if (firstName === '' || lastName === '' || age === '' || dishDescription === '') {
            return;
        }

        const ulProgressElement = document.querySelector('#in-progress');
        const ulFinishedElement = document.querySelector('#finished');
        const progressCountElement = document.querySelector('#progress-count');

        const liElement = generateHtmlElement('li', '', ulProgressElement, { className: 'each-line', });
        const articleElement = generateHtmlElement('article', '', liElement);
        const h4Element = generateHtmlElement('h4', `${firstName} ${lastName}`, articleElement);
        const pGenderAge = generateHtmlElement('p', `${gender}, ${age}`, articleElement);
        const pDescription = generateHtmlElement( 'p', `Dish description: ${dishDescription}`, articleElement);
        const editButton = generateHtmlElement( 'button', 'Edit', liElement, { className: 'edit-btn' }, edit);
        const completeButton = generateHtmlElement('button','Mark as complete',liElement,{ className: 'complete-btn' },complete);

        progressCountElement.textContent = Number(progressCountElement.textContent) + 1;

        Object.keys(inputs).map((key) => (inputs[key].value = ''));

        function edit() {
            Object.values(inputs).map((input, index) => (input.value = inputFields[index]));
            liElement.remove();
            progressCountElement.textContent = Number(progressCountElement.textContent) - 1;
        }

        function complete() {
            editButton.remove();
            completeButton.remove();
            ulFinishedElement.appendChild(liElement);
            progressCountElement.textContent = Number(progressCountElement.textContent) - 1;
        }

        const clearButton = document.querySelector('#clear-btn');
        clearButton.addEventListener('click', clear);

        function clear() {
            ulFinishedElement.innerHTML = '';
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
