function phoneBook(input){

    let phoneBook = {}                  // Правим празен обект, в който ще слагаме нашите получените хора и телефони 
    for (let element of input) {        // Минаваме по елементите от масива 
        let tokens = element.split(" ") // Взимаме токена и го сплитваме по разстояние 
        let name = tokens[0]            // на нулевия индекс стои името на човека 
        let phone = tokens[1]           // на първи индекс е неговия телефон 
        phoneBook[name] = phone         // Към обекта добавяме като ключ името и като стойност телефонния номер 
    }

    for (let name in phoneBook){        // минаваме с for in цикъл през обекта 
        console.log(`${name} -> ${phoneBook[name]}`)    // печатаме даденото име и неговата стойност 
    }

}
phoneBook(['Tim 0834212554', 'Peter 0877547887', 'Bill 0896543112', 'Tim 0876566344'])

// phoneBook(['George 0552554',
// 'Peter 087587',
// 'George 0453112',
// 'Bill 0845344'])