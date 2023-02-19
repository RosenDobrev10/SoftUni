window.addEventListener('load', solve);

function solve() {
    const inputs = {
        firstNameElement: document.querySelector('#first-name'),
        lastNameElement: document.querySelector('#last-name'),
        ageElement: document.querySelector('#age'),
        storyTitleElement: document.querySelector('#story-title'),
        genreElement: document.querySelector('#genre'),
        storyElement: document.querySelector('#story'),
    };

    const publishButton = document.querySelector('#form-btn');
    publishButton.addEventListener('click', publish);

    function publish() {

        const firstName = inputs.firstNameElement.value;
        const lastName = inputs.lastNameElement.value;
        const age = inputs.ageElement.value;
        const storyTitle = inputs.storyTitleElement.value;
        const genre = inputs.genreElement.value;
        const story = inputs.storyElement.value;

        if ( firstName === '' || lastName === '' || age === '' || storyTitle === '' || story === '') {
          return;
        }

        const ulPreview = document.querySelector('#preview-list');
        const liElement = generateHtmlElement('li', '', ulPreview, { className: 'story-info' });
        const articleElement = generateHtmlElement('article', '', liElement);
        const h4Element = generateHtmlElement( 'h4', `Name: ${firstName} ${lastName}`, articleElement);
        const pAgeElement = generateHtmlElement('p', `Age: ${age}`, articleElement);
        const pTitleElement = generateHtmlElement( 'p', `Title: ${storyTitle}`, articleElement);
        const pGenreElement = generateHtmlElement('p', `Genre: ${genre}`, articleElement);
        const pStoryElement = generateHtmlElement('p', story, articleElement);
        const saveButton = generateHtmlElement( 'button', 'Save Story', liElement, { className: 'save-btn' }, save);
        const editButton = generateHtmlElement( 'button', 'Edit Story', liElement, { className: 'edit-btn' }, edit);
        const deleteButton = generateHtmlElement( 'button', 'Delete Story', liElement, { className: 'delete-btn' }, deleteFunction);

        Object.keys(inputs).map((key) => (inputs[key].value = '')); // maybe genre shouldn't be cleared

        publishButton.disabled = true;

        function edit() {
            inputs.firstNameElement.value = firstName;
            inputs.lastNameElement.value = lastName;
            inputs.ageElement.value = age;
            inputs.storyTitleElement.value = storyTitle;
            inputs.genreElement.value = genre;
            inputs.storyElement.value = story;
            liElement.remove();
            publishButton.disabled = false;
        }

        function save() {
            const mainDiv = document.querySelector('#main');
            mainDiv.innerHTML = '';
            const h1Element = generateHtmlElement('h1', 'Your scary story is saved!', mainDiv);
        }

        function deleteFunction() {
            liElement.remove();
            publishButton.disabled = false;
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
