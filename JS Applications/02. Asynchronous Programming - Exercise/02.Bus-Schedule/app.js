function solve() {

    let infoElement = document.querySelector(".info");  // Взимаме инфо елемента, в който ще показваме спирката
    let departBtn = document.getElementById("depart");  // Селектираме бутона depart
    let arriveBtn = document.getElementById("arrive");  // Селектираме бутона arrive

    let busStop = {                 // Правим обект, в който да пазим следващата спирка 
        next: "depot",              // В началото спирката е depot 
    };

    function depart() {
        departBtn.disabled = true;      // Изключваме бутона za depart, след като сме го натиснали 
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`)   // Взимаме заявката със текущата спирка 
            .then((response) => response.json())                                // Обработваме промиса от респонсе
            .then((data) => {                                                   // Обработваме промиса от дата
                busStop = JSON.parse(JSON.stringify(data));                     // Презаписваме стойността на обекта busStop с полученото от data 
                infoElement.textContent = `Next stop ${busStop.name}`;          // Сменяме на инфо елемента съдържанието със името на спирката 
            })
            .catch((error) => console.log(error));                              // Ако уловим грешка я печатаме
        arriveBtn.disabled = false;                                             // Активираме бутона за arrive
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${busStop.name}`;                // Сменяме на инфо елемента съдържанието със името на спирката 
        departBtn.disabled = false;                                             // Активираме бутона depart 
        arriveBtn.disabled = true;                                              // Деактивираме бутона arrive 
    }   

    return {
        depart,
        arrive,
    };
}

let result = solve();
