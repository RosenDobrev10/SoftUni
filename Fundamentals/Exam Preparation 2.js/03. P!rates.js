function pirates(input) {

    let cities = {};                            // Създаваме обект с градове, в който ще попълваме градовете ни 

    while (input[0] !== "Sail") {               // Докато дойде команда Sail, ще си въвеждаме градовете за обиране 
        let line = input.shift().split("||");   // Взимаме нулевия елемент и го делим по ||
        let town = line[0];                     // на нулев индекс е името на града 
        let people = Number(line[1]);           // на първи индекс е броя на хората 
        let gold = Number(line[2]);             // на втори индекс са килограмите злато 
        if (cities.hasOwnProperty(town)) {      // Ако ИМАМЕ вече такъв град в обекта
            cities[town].people += people;      // Добавяме към текущия брой хора, новите 
            cities[town].gold += gold;          // Добавяме към текущите килограми злато, новите
        } else {                                // Ако НЯМА такъв град в обекта
            cities[town] = { people, gold };    // Създаваме нов град в обекта градове, с количеството хора и злато 
        }
    }

    while (input[0] !== "End") {                // Докато получим команда End, ще имаме команди над градовете ни 
        let line = input.shift().split("=>");   // Взимаме нулевия елемент и го делим по =>
        let command = line[0];                  // Командата ни е на нулев индекс 
        let town = line[1];                     // Името на града е на първи индекс 

        if (command === "Plunder") {            // Ако командата е Plunder 
            let people = Number(line[2]);       // Броя на хората е втори индекс                   
            let gold = Number(line[3]);         // Количеството злато е на трети индекс     
            cities[town].people -= people;      // Убиваме броя хора от текущите в града 
            cities[town].gold -= gold;          // Ограбваме количеството злато от текущото в града
            console.log(`${town} plundered! ${gold} gold stolen, ${people} citizens killed.`);  // Печатаме съобщение 
            if (cities[town].people <= 0 || cities[town].gold <= 0) {   // Ако хората или златото стане 0 или по-малко 
                console.log(`${town} has been wiped off the map!`);     // Печатаме съобщение 
                delete cities[town];                                    // Премахваме града от целите ни 
            }

        } else if (command === "Prosper") {     // Ако командата е Prosper
            let gold = Number(line[2]);         // Количеството злато е на втори индекс 
            if (gold < 0) {                     // Ако получим отрицателна число като злато 
                console.log("Gold added cannot be a negative number!"); // Печатаме съобщение 
            } else {                            // Ако получим валидно число като злато 
                cities[town].gold += gold;      // Към текущото на града, добавяме полученото 
                console.log(`${gold} gold added to the city treasury. ${town} now has ${cities[town].gold} gold.`); // Печатаме 
            }
        }

    }

    let count = Object.keys(cities).length;         // От ключовете на обекта вадим неговата дължина(колко градове имаме останали)
    if (count !== 0) {                              // Ако има останали градове 
        console.log(`Ahoy, Captain! There are ${count} wealthy settlements to go to:`); // Печатаме колко са останали 
        for (let town in cities) {                  // Минаваме по всеки град от обекта     
            console.log(`${town} -> Population: ${cities[town].people} citizens, Gold: ${cities[town].gold} kg`);   // Печатаме 
        }
    } else {                                        // Ако НЯМА останали градове
        console.log("Ahoy, Captain! All targets have been plundered and destroyed!");   // Печатаме 
    }

}
// pirates(["Tortuga||345000||1250",
// "Santo Domingo||240000||630",
// "Havana||410000||1100",
// "Sail",
// "Plunder=>Tortuga=>75000=>380",
// "Prosper=>Santo Domingo=>180",
// "End"])

pirates([
    "Nassau||95000||1000",
    "San Juan||930000||1250",
    "Campeche||270000||690",
    "Port Royal||320000||1000",
    "Port Royal||100000||2000",
    "Sail",
    "Prosper=>Port Royal=>-200",
    "Plunder=>Nassau=>94000=>750",
    "Plunder=>Nassau=>1000=>150",
    "Plunder=>Campeche=>150000=>690",
    "End",
]);
