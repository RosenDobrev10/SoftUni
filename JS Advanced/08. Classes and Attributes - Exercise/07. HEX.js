class Hex {
    constructor(value) {
        this.value = value; // Получаваме стойност за създаване на нашия обект от клас Hex
    }
    valueOf() {                             // Създаваме метод valueOf
        return this.value;                  // Връща стойността от конструктора 
    }
    toString() {                            // Създаваме метод toString  
        return `0x${this.value.toString(16).toUpperCase()}`;    // toString(16) - Превръща decimal v hexadecimal и после ги правим главни букви 
    }
    plus(hexObject) {                                   // Създаваме метод plus, който приема Hex обект 
        let result = this.value + hexObject.valueOf();  // Взимаме стойността от нашият обект и я събираме със стойността от подадения обект 
        return new Hex(result);                         // Връщаме нов обект с изчисления резултат 
    }
    minus(hexObject) {                                  // Създаваме метод minus, който приема Hex обект 
        let result = this.value - hexObject.valueOf();  // От стойността на нашият обект изваждаме стойността на подадения обект
        return new Hex(result);                         // Връщаме нов обект с изчисления резултат
    }
    parse(string) {                         // Създаваме метод parse
        return parseInt(string, 16);        // parseInt - Превръща подаден стринг, в decimal през hexadecimal     
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === "0xF");
console.log(FF.parse("AAA"));
