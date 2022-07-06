function travelTime(input) {
 
    let countries = {};                                         // Правим обект, в който ще пазим страните ни 
 
    for (let element of input) {                                // Минаваме по елементите от инпута 
 
        let [country, town, price] = element.split(" > ")       // Създаваме си три променливи, държава, град и цена 
 
        if (!countries.hasOwnProperty(country)) {               // Ако няма такава държава 
            countries[country] = {};                            // я добавяме като пропърти с празен обект като стойност 
        }
        if (!countries[country].hasOwnProperty(town)) {         // Ако няма в държавата, такъв град  
            countries[country][town] = Number.MAX_SAFE_INTEGER; // го добавяме с висока цена
        }
        if (countries[country].hasOwnProperty(town)) {          // Ако намерим същия град 
            if ( countries[country][town] > Number(price)) {    // Проверяваме дали цената му е по-голяма от досешната 
                countries[country][town] = Number(price);       // Ако цената е по-малка, слагаме текущата цена, иначе запазваме предишната 
            }
        }
    }

    let sortedCountries = Object.keys(countries).sort((a, b)=>a.localeCompare(b));  // сортираме държаните по азбучен ред 
 
    for (let country of sortedCountries) {      // Минаваме по държаните от сортираните 
        let output = "";                        // Създаваме променлива за отпечатването 
        output += (country + " -> ");           // Към отпечатването добавяме държавата
 
        let sortedTownsByPrice = Object.keys(countries[country]).sort((t1,t2) => countries[country][t1] - countries[country][t2]);
        // Сортираме градовете в държавата по цена 

        for (let town of sortedTownsByPrice) {          // Минаваме по градовете в сортираните 
            output += (town + " -> ");                  // Към отпечатването добавяме града
            output += (countries[country][town]+ " ");  // Към отпечатването добавяме и цената 
        }
 
        console.log(output);                // Накрая печатаме събраното за държавата и след почваме наново за следващата държава
    }
}
travelTime([
'Bulgaria > Sofia > 25000',
'Bulgaria > Sofia > 25000',
'Kalimdor > Orgrimar > 25000',
'Albania > Tirana > 25000',
'Bulgaria > Varna > 25010',
'Bulgaria > Lukovit > 10'
    ])