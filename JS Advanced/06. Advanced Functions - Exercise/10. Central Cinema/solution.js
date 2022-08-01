function solve() {
 
    let [name, hall, price] = document.querySelectorAll('#container input');

    let btnOnScreen = document.querySelector('#container button');
    let buttonClearElement = document.querySelector('#archive button' );
 
    let ulMoviesElement = document.querySelector('#movies ul' );
    let ulArchiveElement = document.querySelector('#archive ul' );
 
 
    btnOnScreen.addEventListener('click', e => {
        e.preventDefault();
 
        if (name.value === '' || hall.value === '' || price.value === '' || !Number(price.value) || price.value === '0') {
            return;
        }

        let liElement = document.createElement('li');

        let spanElement = document.createElement('span');
        spanElement.textContent = name.value;
        liElement.appendChild(spanElement)

        let strongElement = document.createElement('strong');
        strongElement.textContent = `Hall: ${hall.value}`;
        liElement.appendChild(strongElement)
        
        ulMoviesElement.appendChild(liElement)
 
        let divElement = document.createElement('div');

        let strongPriceElement = document.createElement('strong');
        strongPriceElement.textContent = Number(price.value).toFixed(2);
        divElement.appendChild(strongPriceElement);

        let inputPriceElement = document.createElement('input');
        inputPriceElement.placeholder = 'Tickets Sold';
        divElement.appendChild(inputPriceElement);

        let buttonArchive = document.createElement('button');
        buttonArchive.textContent = 'Archive';
        divElement.appendChild(buttonArchive);
        
        liElement.appendChild(divElement);
 
        name.value = ''
        hall.value = ''
        price.value = ''

 
        buttonArchive.addEventListener('click', e => {
            e.preventDefault();
 
            if (!Number(inputPriceElement.value) || inputPriceElement === '0') {
                return;
            }
 
            let totalAmount = Number(inputPriceElement.value) * Number(strongPriceElement.textContent);
 
            let liArchiveElement = document.createElement('li');

            let spanArchiveElement = document.createElement('span');
            spanArchiveElement.textContent = e.currentTarget.parentElement.parentElement.firstChild.textContent;
            liArchiveElement.appendChild(spanArchiveElement);

            let strongArchiveElement = document.createElement('strong');
            strongArchiveElement.textContent = `Total amount: ${totalAmount.toFixed(2)}`
            liArchiveElement.appendChild(strongArchiveElement);

            let buttonDeleteElement = document.createElement('button');
            buttonDeleteElement.textContent = 'Delete';
            liArchiveElement.appendChild(buttonDeleteElement);
 
            ulArchiveElement.appendChild(liArchiveElement);
 
            e.currentTarget.parentElement.parentElement.remove()

            
            buttonDeleteElement.addEventListener('click', e => {
                e.preventDefault();
 
                e.currentTarget.parentElement.remove();
            })
 

            buttonClearElement.addEventListener('click' , e => {
                e.preventDefault();
 
                e.currentTarget.parentElement.remove()   
            })
        })
    })
}