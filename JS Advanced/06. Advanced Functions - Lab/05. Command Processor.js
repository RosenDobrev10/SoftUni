function commandProcessor() {

    let state = "";                 // Създаваме променлива, в която ще пазим текущото състояние 

    function append(str) {          // Правим функция append, която приема str като параметър 
        state += str;               // към текущия state добавяме(конкатенираме) str 
    }

    function removeStart(n) {       // Правим функция removeStart, която приема n като параметър 
        state = state.slice(n);     // Премахваме първите n букви от променливата 
    }

    function removeEnd(n) {         // Правим функция removeEnd, която приема n като параметър 
        state = state.slice(0, -n); // Премахваме последните n букви от променливата
    }

    function print() {              // Правим функция print
        console.log(state);         // Печатаме променливата 
    }

    return {                        // Функцията връща всички създадени функции като обект 
        append,
        removeStart,
        removeEnd,
        print,
    };
}

let firstZeroTest = commandProcessor();     // Създаваме променлива, която е равна на резултата от функцията(ОБЕКТ)
firstZeroTest.append("hello");
firstZeroTest.append("again");
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
