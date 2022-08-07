function people() {

    class Employee {                            // Създаваме клас Employee
        constructor(name, age) {                // Конструктора приема name и age 
            if (new.target === "Employee") {    // Ако target-a na new е Employee 
                throw new Error("Cannot make instance of abstract class Employee.");    // Хвърляме, грешка че този клас не е за инстанции 
            }
            this.name = name;   // Сетваме name 
            this.age = age;     // Сетваме age 
            this.salary = 0;    // Сетваме salary, първоначално да е 0 
            this.tasks = [];    // Сетваме tasks, първоначално да е празен масив 
        }

        getSalary() {           // Създаваме метод getSalary
            return this.salary; // Който ще връща заплатата 
        }

        work() {                // Създаваме метод  work
            let currentTask = this.tasks.shift();   // Взима от масива със задачите текущата задача  
            this.tasks.push(currentTask);       // Добавя към масива със задачите текущата задача 
            console.log(`${this.name} ${currentTask}`); // Отпечатваме я
        }

        collectSalary() {       // Създаваме метод collectSalary
            console.log(`${this.name} received ${this.getSalary()} this month.`);   // Печатаме съобщение със получената заплата 
        }
    }

    class Junior extends Employee {     // Създаваме клас Junior, който extendva Employee
        constructor(name, age) {        // Конструктора приема name и age  
            super(name, age);           // Наследява name и age
            this.tasks.push(`is working on a simple task.`);    // Добавяме към задачите на Junior, следното 
        }
    }

    class Senior extends Employee {     // Създаваме клас Senior, който extendva Employee
        constructor(name, age) {        // Конструктора приема name и age 
            super(name, age);           // Наследява name и age
            this.tasks.push(`is working on a complicated task.`);   // Добавяме към задачите на Senior, следното 
            this.tasks.push(`is taking time off work.`);            // Добавяме към задачите на Senior, следното     
            this.tasks.push(`is supervising junior workers.`);      // Добавяме към задачите на Senior, следното 
        }
    }

    class Manager extends Employee {        // Създаваме клас Manager, който extendva Employee
        constructor(name, age) {            // Конструктора приема name и age 
            super(name, age);               // Наследява name и age
            this.dividend = 0;              // Той има и dividend допълнително, който първоначално е 0 
            this.tasks.push(`scheduled a meeting.`);                // Добавяме към задачите на Manager, следното 
            this.tasks.push(`is preparing a quarterly report.`);    // Добавяме към задачите на Manager, следното 
        }

        getSalary() {                                   // Overridvame, getSalary метода 
            return super.getSalary() + this.dividend;   // Той ще получава наследеното от getSalary() на Employee + дивидента му 
        }
    }

    return { Employee, Junior, Senior, Manager };
}

const classes = people();
const junior = new classes.Junior('Ivan', 25);
junior.work();
junior.work();
junior.salary = 5811;
junior.collectSalary();
const sinior = new classes.Senior('Alex', 31);
sinior.work();
sinior.work();
sinior.work();
sinior.work();
sinior.salary = 12050;
sinior.collectSalary();
const manager = new classes.Manager('Tom', 55);
manager.salary = 15000;
manager.collectSalary();
manager.dividend = 2500;
manager.collectSalary();
