function add(num) {

    return function sum(n) {    // Създаване функция sum(която приема число) -> резултата от тази функция се връща от функцията add
        return num + n;         // и връща сбора на n и num
    };
}
let add5 = add(5);
console.log(add5(2));
console.log(add5(3));
console.log(add5(10));
