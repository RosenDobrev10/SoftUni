function addDelete() {
    const inputField = document.querySelector('#newItemText');
    const ulElement = document.querySelector('#items');

    const liElement = document.createElement('li');
    liElement.textContent = inputField.value;

    const aElement = document.createElement('a');
    aElement.textContent = '[Delete]';
    aElement.href = '#';

    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);

    aElement.addEventListener('click', (e) => {
        e.currentTarget.parentElement.remove();
    });
    inputField.value = '';
}
