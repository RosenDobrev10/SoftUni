function adressBook(input){

    let adressBook = {}                             // Създаваме масив, в който ще пазим нашите хора и адреси 

    input = input.sort((a,b) => a.localeCompare(b)) // Сортираме масива по азбучен ред 

    for (let element of input) {                    // Минаваме по елементите от инпута 
        let [name, adress] = element.split(":")     // Правим променливи, име и адрес 
        adressBook[name] = adress                   // Създаваме пропъртита като имена и задаваме стойности адресите 
    }

    for (let name in adressBook) {                  // Минаваме по ключовете(имената) от обекта 
        console.log(`${name} -> ${adressBook[name]}`)   // Печатаме, ключа(името) и стойността зад ключа
    }

}
adressBook([
'Bob:Huxley Rd',
'John:Milwaukee Crossing',
'Peter:Fordem Ave',
'Bob:Redwing Ave',
'George:Mesta Crossing',
'Ted:Gateway Way',
'Bill:Gateway Way',
'John:Grover Rd',
'Peter:Huxley Rd',
'Jeff:Gateway Way',
'Jeff:Huxley Rd'])