(function arrayExtension() {                    // Това е IIFE - Immediately invoked function expression

    Array.prototype.last = function () {        // Създаваме метод към прототипа на Array с име last 
        return this[this.length - 1];           // Функцията връща елемента на дължината - 1 
    };

    Array.prototype.skip = function (n) {       // Създаваме метод към прототипа на Array с име skip 
        let result = [];                        // Създаваме празен масив, в който ще слагаме нужните ни елементи 
        for (let i = n; i < this.length; i++) { // Минаваме от n до края на масива, за да пропуснем n елемента 
            result.push(this[i]);               // Към резултата добавяме всеки елемент 
        }
        return result;                          // Функцията връща резултатния масив 
    };

    Array.prototype.take = function (n) {       // Създаваме метод към прототипа на Array с име take 
        let result = [];                        // Създаваме празен масив, в който ще слагаме нужните ни елементи
        for (let i = 0; i < n; i++) {           // Минаваме от началото до n-тия елемент, за да вземем n елемента
            result.push(this[i]);               // Към резултата добавяме всеки елемент
        }
        return result;                          // Функцията връща резултатния масив
    };

    Array.prototype.sum = function () {         // Създаваме метод към прототипа на Array с име sum 
        let sum = 0;                            // Създаваме променлива за сумата 
        for (let i = 0; i < this.length; i++) { // Минаваме по целия масив 
            sum += this[i];                     // Добавяме всеки елемент към сумата 
        }
        return sum;                             // Функцията връща сумата
    };

    Array.prototype.average = function () {     // Създаваме метод към прототипа на Array с име average 
        let sum = 0;                            // Създаваме променлива за сумата
        for (let i = 0; i < this.length; i++) { // Минаваме по целия масив
            sum += this[i];                     // Добавяме всеки елемент към сумата
        }
        let average = sum / this.length;        // Създаваме променлива за средното аритметично като делим сумата на дължината 
        return average;                         // Функцията връща средното аритметично 
    };  
})()                                           // Това е IIFE - Immediately invoked function expression
