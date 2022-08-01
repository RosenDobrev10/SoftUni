function solve() {
    let displayMovie = document.querySelector('#movies ul');
    let archive = document.querySelector('#archive ul');
    archive.nextElementSibling.addEventListener('click', () => archive.innerHTML = null);  // clear archive
    document.querySelector('button').addEventListener('click', addMovieOnScreen);
 
    function addMovieOnScreen(e) {
        e.preventDefault();
        let [name, hall, price] = document.querySelectorAll('#container input');
 
        if (name.value && hall.value && Number(price.value) || price.value === '0') {
 
            displayMovie.innerHTML +=
                `<li>
                    <span>${name.value}</span>
                    <strong>Hall: ${hall.value}</strong>
                    <div>
                      <strong>${price.value}</strong>
                      <input placeholder="Tickets Sold">
                      <button>Archive</button>
                    </div>
                </li>`
 
            name.value = null;
            hall.value = null;
            price.value = null;
 
        }
 
        Array.from(displayMovie.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', addToArchive));
 
        function addToArchive(btn) {
 
            let ticketPrice = btn.target.parentNode.children[0];
            let ticketsSold = btn.target.parentNode.children[1];
 
            if (Number(ticketsSold.value) || ticketsSold.value === '0') {
 
                archive.innerHTML +=
                    `<li>
                        <span>${btn.target.parentNode.parentNode.children[0].textContent}</span>
                        <strong>Total amount: ${(ticketPrice.textContent * ticketsSold.value).toFixed(2)}</strong>
                        <button>Delete</button>
                    </li>`
 
                btn.target.parentNode.parentNode.remove(); // remove movie from screen
                Array.from(archive.querySelectorAll('button')).forEach(btn => btn.addEventListener('click', (btn) => btn.target.parentNode.remove())); // remove  movie from archive
 
            }
        }
    }
}