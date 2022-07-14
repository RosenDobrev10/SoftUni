class Laptop {                          // Създаваме си клас Laptop 
     
    constructor(info, quality) {        // Конструктора ни съдържа, параметри за info и quality
    this.info = info;                   // Създаваме пропърти info, което е равно на info от параметъра 
    this.isOn = false;                  // Създаваме пропърти isOn, което първоначално ще е равно на false 
    this.quality = quality;             // Създаваме пропърти quality, което е равно на quality от параметъра
    }

    turnOn() {                          // Правим функция 
    this.isOn = true;                   // Ако функцията се извика променя пропърти isOn на true 
    this.quality--;                     // При всяко извикване на функцията, стойността на пропъртито намаля с 1 
    }

    turnOff() {                         // Правим функция
    this.isOn = false;                  // Ако функцията се извика променя пропърти isOn на false
    this.quality--;                     // При всяко извикване на функцията, стойността на пропъртито намаля с 1
    }

    showInfo() {                        // Правим функция 
    return JSON.stringify(this.info);   // При извикване на функция да "return" JSON.string от инфото на класа 
    }

    get price() {                       // правим пропърти създадено от функция 
    return 800 - this.info.age * 2 + this.quality * 0.5;    // тя ще връща този израз. 
    }
}

let info = { producer: "Dell", age: 2, brand: "XPS" };
let laptop = new Laptop(info, 10);
laptop.turnOn();
console.log(laptop.showInfo());
laptop.turnOff();
console.log(laptop.quality);
laptop.turnOn();
console.log(laptop.isOn);
console.log(laptop.price);
