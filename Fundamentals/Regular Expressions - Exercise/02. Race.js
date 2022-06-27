function race(input) {

    let participants = input.shift().split(", ");     // Изваждане от инпута, нашите участници(стринг) и ги правим на масив 
    let racers = {};                                  // Правим празен обект, в който ще събираме състезателите 

    for (let line of input) {                           // Минаваме по всяка линия от останалия инпут

        if (line !== "end of race") {                           // Ако текущата линия не е end of race 
            let racerName = line.match(/[a-z]+/gi).join("");    // Взимаме името на състезателя
            let distanceInDigits = line.match(/\d/g);           // Взимаме цифрите от линията 
            let distance = 0;                                   // Правим нулева дистанция в началото 

            for (let digit of distanceInDigits) {               // Минаваме по всяка цифра от масива с цифри 
                distance += Number(digit);                      // и ги събираме, за да изчислим дистанцията 
            }

            if (participants.includes(racerName)) {             // Ако в списъка с участници има такъв
                if (racers.hasOwnProperty(racerName)) {         // Проверяваме дали имаме вече такъв обект, ако има 
                    racers[racerName] += distance;              // Ако има към досегашната дистанция, прибавяме новоизчислената 
                } else {                                        // Проверяваме дали имаме вече такъв обект, АКО НЯМА 
                    racers[racerName] = distance;               // Създаваме нов обект с изчислената дистанция 
                }
            }
        }
    }
    let sorted = Object.keys(racers).sort((a, b) => racers[b] - racers[a])  // Сортираме ключовете от обекта по тяхната стойност за дистанция 
    console.log(`1st place: ${sorted[0]}`)      // Печатаме нулевия елемент от получения масив 
    console.log(`2nd place: ${sorted[1]}`)      // Печатаме първия елемент от получения масив
    console.log(`3rd place: ${sorted[2]}`)      // Печатаме втория елемент от получения масив
}
race([
    "George, Peter, Bill, Tom",
    "G4e@55or%6g6!68e!!@ ",
    "R1@!3a$y4456@",
    "B5@i@#123ll",
    "G@e54o$r6ge#",
    "7P%et^#e5346r",
    "T$o553m&6",
    "end of race",
]);
