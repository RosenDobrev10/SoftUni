class Person {                                      // Създаваме клас с име Person
    constructor(firstName, lastName, age, email) {  // Създаваме конструктор, който приема 4 параметъра 
        this.firstName = firstName;                 // Създаваме пропърти firstName, което е подаденият ни параметър firstName
        this.lastName = lastName;                   // Създаваме пропърти lastName, което е подаденият ни параметър lastName
        this.age = age;                             // Създаваме пропърти age, което е подаденият ни параметър age
        this.email = email;                         // Създаваме пропърти email, което е подаденият ни параметър email
    }
    toString() {                                    // Създаваме метод към класа
        return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;   // Той ще връща това съобщение
    }
}
const rosen = new Person("Rosen", "Dobrev", 32, "rosendobrev@mail.bg"); 
// Създаваме променлива, която е инстанция на класа Person като подаваме нужните параметри
const yordanka = new Person("Yordanka", "Trendafilova", 31, "yordanka_tr@abv.bg");
// Създаваме променлива, която е инстанция на класа Person като подаваме нужните параметри

console.log(rosen.toString());          // Отпечатваме какво прави метода на дадената инстанция 
console.log(yordanka.toString());       // Отпечатваме какво прави метода на дадената инстанция

console.log(rosen instanceof Person);   // чрез instanceof проверяваме дали подадената инстанция е от класа Person 

