function personInfo(firstName, lastName, age) {

    let person = {firstName, lastName, age }; // Ако не сложим : между property и value, това което напишем става и двете 
      
    return person;
}
console.log(personInfo("Peter", "Pan", 20));
console.log(personInfo("George", "Smith", 18));