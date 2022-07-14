function personInfo(firstName, lastName, age) {

    let person = { firstName: firstName, lastName: lastName, age: age };  
    // Декларираме обект и в него попълваме Key:Value  
    return person;
}
console.log(personInfo("Peter", "Pan", 20));
console.log(personInfo("George", "Smith", 18));