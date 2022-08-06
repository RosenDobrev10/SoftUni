class Stringer {
    constructor(innerString, innerLength) {     // Приемаме два параметъра, стринг и дължината му 
        this.innerString = innerString;
        this.innerLength = innerLength;
    }
    increase(length) {                          // Имаме метод за увеличаване на дължината с дадена дължина 
        this.innerLength += length;             // Към дължината прибавяме подадената дължина 
    }
    decrease(length) {                          // Имаме метод за намаляне на дължината с дадена дължина
        this.innerLength -= length;             // От дължината изваждаме подадената дължина 
        if (this.innerLength < 0) {             // Ако дължината стане по-малко от 0 
            this.innerLength = 0;               // Я сетваме да е 0 
        }
    }
    toString() {                                            // Имаме метод за връщане на стринга 
        if (this.innerString.length > this.innerLength) {   // Ако дължината на стринга е по-голяма от дължината 
            return `${this.innerString.slice(0, this.innerLength)}...`; // Отрязваме парче от стринга от началото до дължината
        }
        if (this.innerLength === 0) {                       // Ако дължината ни е 0 
            return `...`;                                   // Отпечатваме три точки 
        }
        return this.innerString;                            // Връщаме стринга 
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test
test.decrease(3);
console.log(test.toString()); // Te...
test.decrease(5);
console.log(test.toString()); // ...
test.increase(4);
console.log(test.toString()); // Test
