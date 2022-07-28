function add(num) {
    
    return (n) => num + n; // Функцията add връща резултата на arrow функция с параметър n и сбора и с num
}
let add5 = add(5);
console.log(add5(2));
console.log(add5(3));
console.log(add5(10));
