function getPersons() {

    class Person {                                          // Създаваме клас с име Person
        constructor(firstName, lastName, age, email) {      // Създаваме конструктор, който приема 4 параметъра
            this.firstName = firstName;                     // Създаваме пропърти firstName, което е подаденият ни параметър firstName
            this.lastName = lastName;                       // Създаваме пропърти lastName, което е подаденият ни параметър lastName
            this.age = age;                                 // Създаваме пропърти age, което е подаденият ни параметър age
            this.email = email;                             // Създаваме пропърти email, което е подаденият ни параметър email
        }
        toString() {                                        // Създаваме метод към класа
            return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`; // Той ще връща това съобщение
        }
    }

    let persons = [];                                                  // Създаваме си празен масив, за хората които ще създадем 
    let person1 = new Person("Anna", "Simpson", 22, "anna@yahoo.com");  // Създаваме първия ни човек 
    persons.push(person1);                                              // Добавяме създадената инстанция към масива             
    let person2 = new Person("SoftUni");                                // Създаваме втория ни човек
    persons.push(person2);                                              // Добавяме създадената инстанция към масива 
    let person3 = new Person("Stephan", "Johnson", 25);                 // Създаваме третия ни човек
    persons.push(person3);                                              // Добавяме създадената инстанция към масива 
    let person4 = new Person("Gabriel", "Peterson", 24, "g.p@gmail.com");   // Създаваме четвъртия ни човек
    persons.push(person4);                                              // Добавяме създадената инстанция към масива 
    return persons;                                                     // Връщаме масива със създадените обекти от класа Person
}
