function convertToObject(JSONstring){

    let person = JSON.parse(JSONstring) // JSON.parse = Превръща подадения стринг в обект 

    let props = Object.keys(person)     // Изкарваме свойствата на дадения обект 

    for (let prop of props){            // Минаваме по всичките свойства на обекта 
        console.log(`${prop}: ${person[prop]}`) // Печатаме свойството и след него чрез индексиращ оператор вадим свойството на обекта 
    }
}
convertToObject('{"name": "George", "age": 40, "town": "Sofia"}')
//convertToObject('{"name": "Peter", "age": 35, "town": "Plovdiv"}')