function baloons() {

    class Balloon {                             // Създаваме клас Balloon
        constructor(color, hasWeight) {         // Този клас има color и hasWeight
            this.color = color;                 // Сетваме го
            this.hasWeight = hasWeight;         // Сетваме го      
        }
    }

    class PartyBalloon extends Balloon {        // Създаваме клас PartyBalloon, който extendva Balloon
        constructor(color, hasWeight, ribbonColor, ribbonLength) {  // Този клас има color,hasWeight,ribbonColor и ribbonLength
            super(color, hasWeight);                                // Взима от конструктора на Baloon, неговите color и hasWeight
            this.ribbonColor = ribbonColor;                         // Сетваме го
            this.ribbonLength = ribbonLength;                       // Сетваме го
            this._ribbon = { color: ribbonColor, length: ribbonLength };    // Създаваме пропърти, което е обект с цвят и дължина 
        }
        get ribbon() {              // Имаме getter за ribbon
            return this._ribbon;    // Който връща this._ribbon
        }
    }

    class BirthdayBalloon extends PartyBalloon {        // Създаваме клас BirthdayBalloon, който extendva PartyBalloon
        constructor(color, hasWeight, ribbonColor, ribbonLength, text) {    // Този клас има color,hasWeight,ribbonColor,ribbonLength и text
            super(color, hasWeight, ribbonColor, ribbonLength);     // Взима от конструктора на PartyBalloon, неговите color,hasWeight,ribbonColor и ribbonLength
            this._text = text;      // Сетваме го
        }
        get text() {                // Имаме getter за text
            return this._text;      // Който връща this._text
        }
    }

    return { Balloon, PartyBalloon, BirthdayBalloon };  // Връщаме в обект трите създадени класа 
}

let classes = baloons();
let testBalloon = new classes.Balloon("yellow", 20.5);
let testPartyBalloon = new classes.PartyBalloon("yellow", 20.5, "red", 10.25);
let ribbon = testPartyBalloon.ribbon;
console.log(testBalloon);
console.log(testPartyBalloon);
console.log(ribbon);
