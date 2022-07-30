function destinationMapper(input){

    let pattern = /([=|\/])(?<place>[A-Z][A-Za-z]{2,})\1/g;
    // Трябва да почва с = или / => после имаме група place, която трябва да почва с главна буква после още поне 2 големи или малки букви 
    // След това трябва да има същия символ като този, с който е почнал 
    let match = pattern.exec(input);                // Намираме съвпадението 
    let destinations = [];                           // Създаваме масив с дестинациите 
    let travelPoints = 0;                            // Правим брояч за точките 
    
    while (match !== null){                         // Докато има съвпадения 
        destinations.push(match.groups.place);       // Към масива, добавяме намерения град 
        travelPoints += match.groups.place.length;   // Добавяме дължината на намерения град към точките 
        match = pattern.exec(input);                 // Подменяме съвпадението 
    }
    console.log(`Destinations: ${destinations.join(", ")}`); // Печатаме дестинациите разделени със запетая и интервал
    console.log(`Travel Points: ${travelPoints}`);           // Печатаме точките 
}
destinationMapper("=Hawai=/Cyprus/=Invalid/invalid==i5valid=/I5valid/=i=")
destinationMapper("ThisIs some InvalidInput")
