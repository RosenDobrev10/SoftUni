function add(number) {

    const inner = function (a) {
        number += a;
        return inner;
    };

    inner.toString = function () {
        return number;
    };
    
    return inner;
}
console.log(add(1).toString());
console.log(add(1)(6)(-3).toString());
