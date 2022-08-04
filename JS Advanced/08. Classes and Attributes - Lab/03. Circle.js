class Circle {                      // Създаваме клас с име Circle 
    constructor(radius) {           // Конструктора, получава един параметър радиус 
        this.radius = radius;       // Задаваме свойство, което е равно на подадения радиус от параметъра 
    }   
    get diameter() {                // Имаме getter diameter, който ще връща диаметъра на кръга 
        return this.radius * 2;     // Който е 2 пъти радиуса 
    }
    set diameter(value) {           // Имаме setter за диаметъра, който ще сетва стойност на радиуса
        this.radius = value / 2;    // Радиуса вече ще е равен на половината на стойността зададена през settera
    }
    get area() {                    // Имаме getter area, който ще връща площа на кръга 
        return Math.PI * this.radius * this.radius; // Площта е πr²
    }
}

let c = new Circle(2);

console.log(`Radius: ${c.radius}`);

console.log(`Diameter: ${c.diameter}`);

console.log(`Area: ${c.area}`);

c.diameter = 1.6;

console.log(`Radius: ${c.radius}`);

console.log(`Diameter: ${c.diameter}`);

console.log(`Area: ${c.area}`);
