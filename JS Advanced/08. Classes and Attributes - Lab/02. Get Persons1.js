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

    return [
    new Person("Anna", "Simpson", 22, "anna@yahoo.com"), 
    new Person("SoftUni"), 
    new Person("Stephan", "Johnson", 25),
    new Person("Gabriel", "Peterson", 24, "g.p@gmail.com"),
    ];
}                                                