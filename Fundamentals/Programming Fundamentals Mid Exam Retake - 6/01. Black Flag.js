function blackFlag(input) {

    let days = Number(input[0])                 // На нулев индекс са броя на дните 
    let plunderForDay = Number(input[1])        // На първи индекс е плячката за ден 
    let expectedPlunder = Number(input[2])      // На втори индекс е очакваната плячка след изминаването на дните 
    let gainedPlunder = 0                       // Правим променливата за събраната плячка 

    for (let i = 1; i <= days; i++){            // Почваме от първи ден до броя на дните и минаваме по тях 
        gainedPlunder += plunderForDay          // Всеки ден събираме плячката за ден 
        if (i % 3 === 0) {                      // Всеки 3-ти ден 
            gainedPlunder += 0.5 * plunderForDay    // Към събраната плячка добавяме 50 % от плячката за ден допълнително 
        }
        if ( i % 5 === 0) {                     // Всеки 5-ти ден 
            gainedPlunder *= 0.7                // Кораб отмъква 30 % от събраната плячка до момента 
        }
    }
    if (gainedPlunder >= expectedPlunder){                                  // Ако събраната плячка е повече или равна на очакваната 
        console.log(`Ahoy! ${gainedPlunder.toFixed(2)} plunder gained.`)    // Печатаме до втората цифра след дес. запетая 
    } else {                                                                // Ако събраната плячка е по-малко от очакваната
        let percentage = gainedPlunder / expectedPlunder * 100              // Изчисляваме процента събрана плячка от очакваната 
        console.log(`Collected only ${percentage.toFixed(2)}% of the plunder.`) // Печатаме до втората цифра след дес. запетая 
    }
}
blackFlag(["5", "40", "100"]);
blackFlag(["10", "20", "380"]);
