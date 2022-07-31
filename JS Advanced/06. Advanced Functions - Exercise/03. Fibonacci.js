function getFibonator() {

    let previous = 0;   // Първия елемент от редицата
    let current = 1;    // Втория елемент от редицата 

    return () => {                          // Правим функция, която ще връща резултат 
        const next = previous + current;    // Следващото число, ще е равно на последните две 
        previous = current;                 // Първото число, вече е равно на второто
        current = next;                     // Второто число, вече е равно на резултата 

        return previous;                    // Връщаме първото число 
    };
}
let fib = getFibonator();

console.log(fib()); // 1

console.log(fib()); // 1

console.log(fib()); // 2

console.log(fib()); // 3

console.log(fib()); // 5

console.log(fib()); // 8

console.log(fib()); // 13
