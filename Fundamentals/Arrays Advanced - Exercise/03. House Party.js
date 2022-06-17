function houseParty(array) {
    let guestList = [];         // Създаваме празен масив, в който слагаме хората от списъка 

    for (let i = 0; i < array.length; i++) {    // Правим цикъл, който обикаля масива ни
        let currentCommand = array[i];          // Взимаме команда
        currentCommand = currentCommand.split(" "); // Дадената команда я разделяме по разстояние 
        let name = currentCommand[0]            // Първия елемент от дадената команда е името на госта 
        if (currentCommand[2] === "going!") {   // Ако третия елемент от масива е going, значи госта ще присъства
            if (guestList.includes(name)) {     //  Ако името му го има в списъка вече
                console.log(`${name} is already in the list!`); // Печатаме, че вече присъства
            } else {                            // Ако името го няма в списъка 
                guestList.push(name);           // го добавяме към списъка 
            }
        } else {                                // Ако третия елемент от масива е not, значи госта няма да ходи  
            if (guestList.includes(name)) {     // Ако името е в списъка 
                guestList.pop(name);            // Махаме името от списъка 
            } else {                            // Ако името го няма в списъка 
                console.log(`${name} is not in the list!`); // Печатаме, че името го няма в списъка въобще
            }
        }
    }
    console.log(guestList.join("\n"));
}
houseParty([
    "Allie is going!",

    "George is going!",

    "John is not going!",

    "George is not going!",
]);
//houseParty([
//"Tom is going!",

//"Annie is going!",

//"Tom is going!",

//"Garry is going!",

//"Jerry is going!",
//]);
