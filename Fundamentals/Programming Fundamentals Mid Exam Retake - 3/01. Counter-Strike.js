function counterStrike(input) {

    let energy = Number(input.shift())          // Взимаме първото число от масива и го парсваме към Number
    let wins = 0                                // Правим брояч на победите 
        
    while(input[0] !== "End of battle" ){       // Правим цикъл докато не получим команда 
        let distance = Number(input.shift())    // Взимаме първия елемент и това е дистанцията до врага 

        if (energy >= distance){                // Ако енергията ни е достатъчна 
            wins++                              // побеждаваме 
            energy -= distance                  // от нашата енергия вадим дистанцията 
        } else {                                // Ако енергията НЕ ни е достатъчна
            console.log(`Not enough energy! Game ends with ${wins} won battles and ${energy} energy`)
            return;                             // Прекъсваме програмата 
        }

        if (wins % 3 === 0){                    // Ако победата ни е 3, 6, 9, 12 и т.н.
            energy += wins                      // добавяме към нашата енергия броят на победите до момента 
        }
    }
    console.log(`Won battles: ${wins}. Energy left: ${energy}`)
}
counterStrike(["100", "10", "10", "10", "1", "2", "3", "73", "10"]);
//counterStrike(["200", "54", "14", "28", "13", "End of battle"]);
