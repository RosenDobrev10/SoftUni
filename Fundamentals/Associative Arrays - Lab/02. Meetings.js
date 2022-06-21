function meetings(input){

    let meetings = {}       // Правим обект, в който ще пазим срещите 

    for (let element of input) {    // Минаваме по елементите на инпута 
        let [day, name] = element.split(" ")
        // Създаваме си две променливи чрез деструктуриране, като взимаме индексите 0 и 1 на елемента разделени по интервал 
        if (!meetings.hasOwnProperty(day)){     // Ако до момента няма насрочена среща в този ден 
        meetings[day] = name                    // вкарваме в обекта, ден и човек като среща 
        console.log(`Scheduled for ${day}`)     // Печатаме за кой ден имаме среща 
        } else {                                // Ако вече ИМА насрочена среща в този ден 
            console.log(`Conflict on ${day}!`)  // Печатаме, че за този ден има вече такава 
        }
    }

    for (let day in meetings) {                 // Минаваме по дните, които са като срещи в срещите 
          console.log(`${day} -> ${meetings[day]}`) // и ги печатаме 
    }

}
// meetings(['Monday Peter',
// 'Wednesday Bill',
// 'Monday Tim',
// 'Friday Tim'])

meetings(['Friday Bob',
'Saturday Ted',
'Monday Bill',
'Monday John',
'Wednesday George'])