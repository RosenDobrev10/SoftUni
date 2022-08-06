function personAndTeacher() {
    class Person {                      // Създаваме клас Person
        constructor(name, email) {      // Той получава name и email 
            this.name = name;           // Сетваме ги 
            this.email = email;         // Сетваме ги
        }
    }

    class Teacher extends Person {              // Създаваме клас Teacher, който extendva Person 
        constructor(name, email, subject) {     // Той получава name, email и subject
            super(name, email);                 // Наследява name и email ot Person 
            this.subject = subject;             // Сетваме ново пропърти 
        }
    }

    return {                            // Връщаме обект, в който са двата ни класа 
        Person,
        Teacher,
    };


}

class Person {                      // Създаваме клас Person
    constructor(name, email) {      // Той получава name и email 
        this.name = name;           // Сетваме ги 
        this.email = email;         // Сетваме ги
    }
}

class Teacher extends Person {              // Създаваме клас Teacher, който extendva Person 
    constructor(name, email, subject) {     // Той получава name, email и subject
        super(name, email);                 // Наследява name и email ot Person 
        this.subject = subject;             // Сетваме ново пропърти 
    }
}

let person = new Person('Rosen', 'rosendobrev@mail.bg')
console.log(`Person: ${person.name} (${person.email})`)

let teacher = new Teacher('Yordanka', 'yordanka_tr@abv.bg', 'Geography')
console.log(`Teacher: ${teacher.name} (${teacher.email}), teaches ${teacher.subject}`)