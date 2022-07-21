function solve() {

   let textArea = document.querySelector('body > div > textarea');   // Намирамето полето за вписване на текст 
   let totalPrice = 0;                                               // Създаваме променлива за изчисляване на общата цена 
   let listOfProducts = [];                                          // Създаваме масив, в който да пазим купените продукти 
   let addBtns = document.getElementsByClassName('add-product');     // Намираме всички бутони "add"

   for (let i = 0; i < addBtns.length; i++) {                        // Минаваме по всеки един бутон 
      addBtns[i].addEventListener('click', function one() {          // Добавяме слушател към бутона 
           let name = document.querySelector(`body > div > div:nth-child(${i + 2}) > div.product-details > div`).textContent;
           let price = document.querySelector(`body > div > div:nth-child(${i + 2}) > div.product-line-price`).textContent;
           if (!listOfProducts.includes(name)) {                     // Ако няма в масива, такъв продукт 
               listOfProducts.push(name);                            // го добавяме 
           }
           let text = `Added ${name} for ${price} to the cart.\n`;   // текста ни е този 
           totalPrice += Number(price);                              // добавяме цената на всеки купен продукт 
           textArea.value += text;                                   // към полето добавяме текста 
       });
   }
   
   let checkOut = document.querySelector('body > div > button');     // Намираме бутона CheckOut 
   checkOut.addEventListener('click', function final() {             // Слагаме му слушател 
       let finalText = `You bought ${listOfProducts.join(', ')} for ${totalPrice.toFixed(2)}.`;   // това ни е сборния текст 
       textArea.value += finalText;                                  // Добавяме го към полето с събраните текст до момента 
       disableButtons();                                             // Викаме функцията 
   });

   function disableButtons() {                                       // Създаваме функция 
      let buttons = Array.from(document.querySelectorAll('button')); // Намираме всички бутони на страницата 
      buttons.forEach(button => button.disabled = true);             // Изключваме всички бутони, за да не са активни повече 
   }
}