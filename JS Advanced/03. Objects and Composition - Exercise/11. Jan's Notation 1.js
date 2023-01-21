function janNotations(arr) {
    const numbers = [];
    const operations = {
        '+': (a, b) => b + a,
        '-': (a, b) => b - a,
        '*': (a, b) => b * a,
        '/': (a, b) => b / a,
    };
    for (const element of arr) {
        if (typeof element === 'number') {
            numbers.push(element);
        } else {
            if (numbers.length < 2) {
                return 'Error: not enough operands!';
            }
            numbers.push(operations[element](numbers.pop(), numbers.pop()));
        }
    }
    if (numbers.length !== 1) {
        return 'Error: too many operands!';
    }
    return numbers[0];
}
console.log(janNotations([3, 4, '+']));
console.log(janNotations([5, 3, 4, '*', '-']));
console.log(janNotations([7, 33, 8, '-']));
console.log(janNotations([15, '/']));
