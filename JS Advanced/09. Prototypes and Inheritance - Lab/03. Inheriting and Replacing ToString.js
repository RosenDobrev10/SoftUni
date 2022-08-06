function inheritingAndReplacingToString() {
    class Person {                          // Създаваме клас Person
        constructor(name, email) {          // Той получава name и email 
            this.name = name;               // Сетваме ги 
            this.email = email;             // Сетваме ги
        }
        toString() {                        // Създаваме метод на класа 
            return `Person (name: ${this.name}, email: ${this.email})`  // Той ще връща това съобщение 
        }
    }

    class Teacher extends Person {              // Създаваме клас Teacher, който extendva Person 
        constructor(name, email, subject) {     // Той получава name, email и subject
            super(name, email);                 // Наследява name и email ot Person 
            this.subject = subject;             // Сетваме ново пропърти 
        }
        toString() {                            // Създаваме метод на класа
            return `Teacher (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`   // Той ще връща това съобщение
        }

    }

    class Student extends Person {              // Създаваме клас Teacher, който extendva Person 
        constructor(name, email, course) {      // Той получава name, email и subject
            super(name, email);                 // Наследява name и email ot Person 
            this.course = course;               // Сетваме ново пропърти 
        }
        toString() {                            // Създаваме метод на класа
            return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})` // Той ще връща това съобщение
        }
    }

    return {                            // Връщаме обект, в който са трите ни класа 
        Person,
        Teacher,
        Student,
    };
}