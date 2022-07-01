function plantDiscovery(input) {

    let n = Number(input.shift());                  // Взимаме броя на растенията, които ще събираме 
    let plants = {};                                // Създаваме обект с нашите растения 

    for (let i = 0; i < n; i++) {                   // Минаваме по броя на растенията 
        let line = input.shift().split("<->");      // Вадим първото растение и сплитваме 
        let plant = line[0];                        // Растението е на нулев индекс 
        let rarity = Number(line[1]);               // Рядкостта е на първи индекс 
        if (plants.hasOwnProperty(plant)) {         // Ако имаме такова растение в обекта
            plants[plant].rarity = rarity;          // подменяме рядкостта му
        } else {                                    // Ако нямаме такова растение в обекта
            plants[plant] = { rarity, rating: [] }; // Създаваме го с value rarity без стойност и value ратинг със стойност празен масив 
        }
    }

    while (input[0] !== "Exhibition") {             // Минаваме по останалите команди докато получим Exhibition
        let line = input.shift().split(": ");       // Делим линията по : и интервал 
        let command = line.shift();                 // Командата е на нулев индекс и я изваждаме 
        let plant = line[0].split(" - ")[0];        // На нулев индекс остава втората част от линията, която пак делим по интервал - интервал и на нулев индекс е името на растението 

        if (command === "Rate") {                   // Ако командата е Rate
            let rating = Number(line[0].split(" - ")[1]);   // Намираме рейтинга 
            if (plants.hasOwnProperty(plant)) {     // Ако има такова растение 
                plants[plant].rating.push(rating);  // Добавяме рейтинга към неговите 
            } else {                                // Ако няма такова растение
                console.log("error");               // Печатаме 
            }

        } else if (command === "Update") {          // Ако командата е Update
            let newRarity = Number(line[0].split(" - ")[1]);
            if (plants.hasOwnProperty(plant)) {     // Ако има такова растение
                plants[plant].rarity = newRarity;   // Подменяме рядкостта с новата такава от командата 
            } else {                                // Ако няма такова растение
                console.log("error");               // Печатаме 
            }

        } else if (command === "Reset") {           // Ако командата е Reset
            if (plants.hasOwnProperty(plant)) {     // Ако има такова растение
                plants[plant].rating = [];          // Премахваме вече натрупаните рейтинги
            } else {                                // Ако няма такова растение
                console.log("error");               // Печатаме 
            }
        }

    }

    console.log("Plants for the exhibition:");      // Печатаме съобщение 
    for (let plant of Object.entries(plants)) {     // Минаваме по всяко растение от превърнатия в масив, обект с растения 
        console.log(`- ${plant[0]}; Rarity: ${plant[1].rarity}; Rating: ${average(plant[1].rating).toFixed(2)}`);
    }

    function average(arr) {                         // Създаваме функция за изчисляване на средния рейтинг на растение                    
        if (arr.length === 0) {                     // Ако в рейтинга няма елементи 
            return 0;                               // Средния рейтинг ще е 0 
        }
        return arr.reduce((a, b) => a + b, 0) / arr.length; // Иначе, събираме всеки две числа като почваме от 0 и ги делим накрая на дължината на масива 
    }
}
plantDiscovery([
"3",
"Arnoldii<->4",
"Woodii<->7",
"Welwitschia<->2",
"Rate: Woodii - 10",
"Rate: Welwitschia - 7",
"Rate: Arnoldii - 3",
"Rate: Woodii - 5",
"Update: Woodii - 5",
"Reset: Arnoldii",
"Exhibition",]);