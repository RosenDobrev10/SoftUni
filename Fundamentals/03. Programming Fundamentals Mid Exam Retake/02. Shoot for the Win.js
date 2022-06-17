function shootForTheWin(input) {

    let targets = input.shift().split(" ").map(Number);         // Взимаме първия елемент делим го по интервал и ги правим на числа
    let shotTargets = 0;                                        // Правим брояч за поразените мишени 

    while (input[0] !== "End") {                                // Докато не получим командата End въртим цикъл
                                       
        let index = Number(input.shift());                      // Взимаме индекса, на който трябва да поразим мишена 
        if (targets[index] !== -1 && index < targets.length && index >= 0) {    // Ако мишената не е поразена и е в диапазона на възможните индекси 
            targets[index] = -1;                                           // Поразяваме мишената и вече е -1 
            shotTargets++;                                                 // Отбелязваме успешено поразена мишена 

            for (let i = 0; i < targets.length; i++) {                     // След като поразим мишена, минаваме по останалите мишени 
                if (targets[i] > targets[index] && targets[i] !== -1) {    // Ако мишената не е вече поразена и има по-голяма стойност от сегашната 
                    targets[i] -= targets[index];                          // Намаляме нейната стойност със стойността на мишената 
                } else if (targets[i] <= targets[index] && targets[i] !== -1) { // Ако мишената не е вече поразена и има по-малка стойност от сегашната 
                    targets[i] += targets[index];                           // Увеличаваме нейната стойност със стойността на мишената 
                }
            }
        }
    }
    console.log(`Shot targets: ${shotTargets} -> ${targets.join(" ")}`);    // Печатаме успешните изстрели с мишените 
}
//shootForTheWin(["24 50 36 70", "0", "4", "3", "1", "End"]);
shootForTheWin(["30 30 12 60 54 66", "5", "2", "4", "0", "End"]);
