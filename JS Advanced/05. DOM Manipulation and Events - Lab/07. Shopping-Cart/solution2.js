function shoppingCart() {
    const addButtons = document.querySelectorAll('.add-product');
    const list = [];
    let totalPrice = 0;
    const textarea = document.querySelector('textarea');
    [...addButtons].forEach(button => {
        button.addEventListener('click', addToCart)
    });
    const checkoutButton = document.querySelector('.checkout');
    checkoutButton.addEventListener('click', onCheckout);
    const allButtons = document.querySelectorAll('button');
    function addToCart(e) {
        const divProductElement = e.target.parentElement.parentElement;
        const money = divProductElement.querySelector('.product-line-price');
        totalPrice += Number(money.textContent)
        const name = divProductElement.querySelector('.product-title');
        if (!list.includes(name.textContent)) {
            list.push(name.textContent)
        }
        textarea.value += `Added ${name.textContent} for ${Number(money.textContent).toFixed(2)} to the cart.\n`;
    }
    function onCheckout() {
        textarea.value += `You bought ${list.join(", ")} for ${totalPrice.toFixed(2)}.`;
        [...allButtons].forEach(button => {
            button.setAttribute("disabled", "");
        });
    }
}
