function computer() {

    class Periphery {
        constructor(manufacturer) {
            if (new.target === Periphery) {
                throw new Error('cannot make instance of abstract class Periphery')
            }
            this.manufacturer = manufacturer
        }
    }

    class Keyboard extends Periphery {
        constructor(manufacturer, responseTime) {
            super(manufacturer)
            this.responseTime = responseTime
        }
    }

    class Monitor extends Periphery {
        constructor(manufacturer, width, height) {
            super(manufacturer)
            this.width = width
            this.height = height
        }
    }

    class Battery extends Periphery {
        constructor(manufacturer, expectedLife) {
            super(manufacturer)
            this.expectedLife = expectedLife
        }
    }

    class Computer extends Periphery {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error('cannot make instance of abstract class Computer')
            }
            super(manufacturer)
            this.processorSpeed = processorSpeed
            this.ram = ram
            this.hardDiskSpace = hardDiskSpace
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.weight = weight
            this.color = color
            this.battery = battery

        }
        get battery() {
            return this._battery
        }

        set battery(value) {
            if (!(value instanceof Battery)) {
                throw new TypeError('argument should be instance of the Battery class')
            }
            this._battery = value
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard
            this.monitor = monitor
        }

        get keyboard() {
            return this._keyboard
        }

        set keyboard(value) {
            if (!(value instanceof Keyboard)) {
                throw new TypeError('argument should be instance of the Keyboard class')
            }
            this._keyboard = value
        }

        get monitor() {
            return this._monitor
        }

        set monitor(value) {
            if (!(value instanceof Monitor)) {
                throw new TypeError('argument should be instance of the Monitor class')
            }
            this._monitor = value
        }
    }


    return { Periphery, Keyboard, Monitor, Battery, Computer, Laptop, Desktop }
}

let classes = computer();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard
let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
console.log(laptop);