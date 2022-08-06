function classHierarchy() {

    class Figure {                                  // Създаваме клас Figure 
        constructor(units = "cm") {                 // Той получава параметър units, който първоначално е cm 
            this.units = units;                     // Сетваме тази стойност да е cm 
        }
        changeUnits(unit) {                         // Създаваме метод, който получава unit 
            this.units = unit;                      // Сетваме units вече да е новата unit 
        }
        metricConversion(num) {                     // Създаваме метод, за преизчисляване на стойността 
            if (this.units === "m") return (num /= 100); // Ако единицата е m, делим на сантиметрите на 100 и получаваме метри 
            if (this.units === "mm") return (num *= 10); // Ако единицата е mm, умножаваме сантиметрите по 10 и получаваме милиметрите    
            return num;                                 // Връщаме полученото число от метода 
        }
        toString() {                                // Създаваме метод, за печатане 
            return `Figures units: ${this.units}`;  // Той печата само мерната единица на фигурата 
        }
    }

    class Circle extends Figure {       // Взимаме пропъртитата и методите на Фигурата и я extendvame като създаваме клас Circle 
        constructor(radius, units) {    // Конструктора получава units и radius 
            super(units);               // Наследява units от Figure 
            this._radius = radius;      // Сетваме _radius от параметъра 
        }
        get area() {                    // Имаме getter за площа на Circle 
            this.radius = this.metricConversion(this._radius);  // Конвертираме първо радиуса в правилната мерна единица 
            return Math.PI * this.radius * this.radius;         // Връщаме резултата от πr²
        }
        toString() {                    // Създаваме метод за печатане, който взима този на Figure и добавя към него
            return `${super.toString()} Area: ${this.area} - radius: ${this.radius}`;
        }
    }

    class Rectangle extends Figure {        // Взимаме пропъртитата и методите на Фигурата и я extendvame като създаваме клас Rectangle
        constructor(width, height, units) { // Конструктора получава units, width и height
            super(units);                   // Наследява units от Figure
            this._width = width;            // Сетваме width от параметъра
            this._height = height;          // Сетваме height от параметъра
        }
        get area() {                        // Имаме getter за площа на Rectangle 
            this.width = this.metricConversion(this._width);    // Конвертираме първо ширината в правилната мерна единица
            this.height = this.metricConversion(this._height);  // Конвертираме първо височината в правилната мерна единица
            return this.width * this.height;                    // Връщаме резултата от умножението на ширината и височината
        }
        toString() {                // Създаваме метод за печатане, който взима този на Figure и добавя към него
            return `${super.toString()} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
        }
    }
    return { Figure, Circle, Rectangle };   // Накрая връщаме трите създадени класа 
}

let c = new Circle(5);
console.log(c.area); // 78.53981633974483
console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, "mm");
console.log(r.area); // 1200
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits("cm");
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

c.changeUnits("mm");
console.log(c.area); // 7853.981633974483
console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50
