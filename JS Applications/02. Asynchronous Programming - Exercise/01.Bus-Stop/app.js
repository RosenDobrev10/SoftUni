function getInfo() {

    const inputElement = document.getElementById("stopId").value;   // Взимаме въведеното в инпут полето 
    const ulElement = document.getElementById("buses");             // Изваждаме ul, където ще въвеждаме информацията за автобусите
    const divElement = document.getElementById("stopName");         // Изваждаме div, където ще въвеждаме името на спирката

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${inputElement}`)    // Достъпваме линка като поставяме на мястото на bus id, въведеното
        .then((response) => response.json())                                // Улавяме първия промис и неговия json
        .then((data) => {                                                   // Улавяме втория промис и неговите данни
            let buses = data.buses;                                         // Обекта с пропърти buses ни дава обект с инфомарция за автобусите
            let name = data.name;                                           // Дава ни името на спирката 

            divElement.textContent = name;                                  // в Дива слагаме името на спирката
            ulElement.innerHTML = "";                                       // Зачистваме списъка от предни търсения 

            Object.keys(buses).forEach((bus) => {                           // Взимаме ключовете от обекта и за всеки автобус
                let liElement = document.createElement("li");               // Създаваме li elementi 
                liElement.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;  //  Слагаме като стойност съобщението 
                ulElement.appendChild(liElement);                           // Закачаме създадения li na ul 
            });
        })
        .catch((error) => {                                                 // Ако има грешка я улавяме 
            divElement.textContent = "Error";                               // Вместо името на спирката, изписваме Error
            ulElement.innerHTML = "";                                       // Зачистваме полето със спирките 
        });
}
