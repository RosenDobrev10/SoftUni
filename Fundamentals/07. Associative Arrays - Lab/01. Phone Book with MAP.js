function phoneBook(input){

    let phoneBook = new Map()             // Правим празен обект, в който ще слагаме нашите получените хора и телефони 
    for (let element of input) {                // Минаваме по елементите от масива 
        let [name, phone] = element.split(" ") // Взимаме името и телефона 
        phoneBook.set(name, phone)      // Към МАПА добавяме като ключ името и като стойност телефонния номер 
    }

    for (let [name, phone] of phoneBook){        // минаваме с for of цикъл през МАПА
        // phoneBook = phonebook.entries() - Дава ни две стойности, име и телефон и ги взимаме като променливи 
        console.log(`${name} -> ${phone}`)    // печатаме даденото име и неговата стойност 
    }

}
phoneBook(['Tim 0834212554', 'Peter 0877547887', 'Bill 0896543112', 'Tim 0876566344'])

// phoneBook(['George 0552554',
// 'Peter 087587',
// 'George 0453112',
// 'Bill 0845344'])