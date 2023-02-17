window.addEventListener('load', solve);

function solve() {
    const inputs = {
        title: document.querySelector('#post-title'),
        category: document.querySelector('#post-category'),
        content: document.querySelector('#post-content'),
    };

    const publishBtn = document.querySelector('#publish-btn');
    publishBtn.addEventListener('click', publish);

    function publish(event) {
        event.preventDefault();

        const title = inputs.title.value;
        const category = inputs.category.value;
        const content = inputs.content.value;

        if (title === '' || category === '' || content === '') {
            return;
        }

        const reviewList = document.querySelector('#review-list');
        const li = generateHtmlElement('li', '', reviewList, { className: 'rpost' });
        const article = generateHtmlElement('article', '', li);
        const h4 = generateHtmlElement('h4', title, article);
        const p = generateHtmlElement('p', `Category: ${category}`, article);
        const p2 = generateHtmlElement('p', `Content: ${content}`, article);
        const editBtn = generateHtmlElement( 'button', 'Edit', li, { className: 'action-btn edit' }, edit );
        const approveBtn = generateHtmlElement( 'button', 'Approve', li, { className: 'action-btn approve' }, approve );

        Object.keys(inputs).map((key) => (inputs[key].value = ''));

        function edit() {
            li.remove();
            inputs.title.value = title;
            inputs.category.value = category;
            inputs.content.value = content;
        }

        const publishedList = document.querySelector('#published-list');
        function approve() {
            editBtn.remove();
            approveBtn.remove();
            publishedList.appendChild(li);
        }

        document.querySelector('#clear-btn').addEventListener('click', clear);
        function clear() {
            publishedList.innerHTML = '';
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
