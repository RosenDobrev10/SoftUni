function listOfItems() {
   const ulElement = document.querySelector('#items');
   const input = document.querySelector('#newItemText');
   const liElement = document.createElement('li');
   liElement.textContent = input.value;
   ulElement.appendChild(liElement);
}
