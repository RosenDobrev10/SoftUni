function commandProcessor() {

    let state = "";                 // Създаваме променлива, в която ще пазим текущото състояние

    return {                                            // Връщаме обект от arrow функции 
        append: (str) => (state += str),
        removeStart: (n) => (state = state.slice(n)),
        removeEnd: (n) => (state = state.slice(0, -n)),
        print: () => console.log(state),
    };
}

let firstZeroTest = commandProcessor(); // Създаваме променлива, която е равна на резултата от функцията(ОБЕКТ)
firstZeroTest.append("hello");
firstZeroTest.append("again");
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
