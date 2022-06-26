function flightSchedule(input) {
 
    let flights = input.shift();            // Взимаме първия елемент от масива, това са всички полети
    let changeStatus = input.shift();       // Взимаме втория елемент от масива, това са канселираните полети 
    let statusToCheck = input.shift().toString(); // Взимаме третия елемент от масива, това е статуса за проверка и го правим на стринг
    let flightList = {};                    // Създаваме си списък с полетите, като обекти 
 
    for (let flight of flights) {           // Минаваме по всеки полет от всички полети
        let [number, Destination] = flight.split(' ');  // Създаваме си променлива номера на полета и дестинацията 
        flightList[number] = {Destination, Status: 'Ready to fly'}  // Създаваме си пропърти номера на полета със стойности дестинацията и първоначално всички са готови да летят 
    }
 
    for (let flight of changeStatus) {          // Минаваме по всеки канселиран полет 
        let [number, currentStatus] = flight.split(' ');    // Правим си променливи с номера на полета и статуса му
 
        if (flightList.hasOwnProperty(number)) {    // Ако в списъка с обекти има пропърти със същия номер на полет като текущия
            flightList[number].Status = currentStatus;  // Статуса на този полет се променя на канселиран
        }
    }
 
    for (let flight in flightList) {            // Минаваме с for in цикъл през обектите от нашия списък с полети 
        if (flightList[flight].Status === statusToCheck) {   // Ако статуса на текущия полет съвпада със статуса за проверка 
            console.log(flightList[flight])         // Печатаме номера на полета от списъка с обекти, той съдържа дестинацията и статуса като стойности 
        }
    }
 
}
flightSchedule([['WN269 Delaware','FL2269 Oregon','WN498 Las Vegas','WN3145 Ohio','WN612 Alabama',
                 'WN4010 New York','WN1173 California','DL2120 Texas','KL5744 Illinois','WN678 Pennsylvania'],

['DL2120 Cancelled','WN612 Cancelled','WN1173 Cancelled','SK430 Cancelled'],
['Ready to fly']
])