function makeADictionary(input){

    let dictionary = {};                        // Създаваме си нов обект, в който да запазваме стойностите от инпута 
    for (let element of input){                 // Минаваме с цикъл през елементите от масива 
        let object = JSON.parse(element);       // парсваме стринга на елемента към обект 
        dictionary = Object.assign(dictionary, object);    // към празния обект, присвояваме получения обект от масива     
    } 
        
    let sortedKeys = Object.keys(dictionary);       // Изваждаме ключовете от вече пълния обект и ги присвояваме към променлива 
    sortedKeys.sort((a, b) => a.localeCompare(b));  // Сортираме ги по възходящ ред 
     
    for (let term of sortedKeys) {                  // Минаваме по термините на сортираните ключове
        let definition = dictionary[term];          // дефиницията е равна на стойността от всеки ключ на обекта    
        console.log(`Term: ${term} => Definition: ${definition}`);  // и ги печатаме всеки на нов ред 
    }
}
makeADictionary([
'{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
'{"Bus":"A large motor vehicle carrying passengers by road,typically one serving the public on a fixed route and for a fare."}',    
'{"Boiler":"A fuel-burning apparatus or container for heating water."}',
'{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',   
'{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified,transmitted, or recorded."}'
])