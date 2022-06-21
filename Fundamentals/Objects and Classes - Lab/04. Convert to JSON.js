function convertToJSON(name, lastName, hairColor) {

    let person = {name, lastName, hairColor}    // Създаваме обект, който има само стойности, като те стават и свойства и стойности
    let JSONstring = JSON.stringify(person)     // Превръщаме обекта в стринг чрез JSON.stringify като подаваме обекта 
    console.log(JSONstring)                     // Отпечатваме стринга 
}
convertToJSON("George", "Jones", "Brown");
convertToJSON("Peter", "Smith", "Blond");
