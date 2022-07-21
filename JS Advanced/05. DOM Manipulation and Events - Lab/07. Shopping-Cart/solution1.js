function solve() {

    Array.from(document.querySelectorAll('.add-product')).forEach(x => x.addEventListener('click', add));
    document.querySelector('.checkout').addEventListener('click', checkout);

    const products = {
       'Bread': 0.8,
       'Milk': 1.09,
       'Tomatoes': 0.99
    }
    const listOfProducts = [];
    const textArea = document.querySelector('textarea');
    let totalPrice = 0;
    let textOutput = '';
  
    function add(event) {
       const current = event.target.parentNode.parentNode.querySelector('.product-title').textContent;
       textOutput = `Added ${current} for ${products[current].toFixed(2)} to the cart.\n`;
       totalPrice += products[current];
       textArea.value += textOutput;
       if (!listOfProducts.includes(current)) { listOfProducts.push(current) }
    }
  
    function checkout() {
       textOutput = `You bought ${listOfProducts.join(', ')} for ${totalPrice.toFixed(2)}.`;
       textArea.value += textOutput;
       Array.from(document.querySelectorAll('button')).forEach(x => x.disabled = true);
    }
 }