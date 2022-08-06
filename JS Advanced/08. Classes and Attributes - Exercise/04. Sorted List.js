class List {
    constructor() {                                 
        this.numbers = [];                              // Създаваме свойство numbers, което е празен масив 
        this.size = this.numbers.length;                // Създаваме свойство size, което е дължината на масива 
    }
    add(element) {                                      // Добавяме метод на класа add, който приема параметър елемент 
        this.numbers.push(element);                     // Към масива с числа, добавяме подадения елемент 
        this.size++;                                    // Увеличаваме големината на масива с единица 
        return this.numbers.sort((a, b) => a - b);      // Връщаме сортиран масива с числата 
    }
    remove(index) {                                         // Добавяме метод на класа remove, който приема параметър индекс 
        if (index >= 0 && index < this.numbers.length) {    // Ако индекса е по-голям или равен на 0 и е по-малък от големината
            this.numbers.splice(index, 1);                  // Изтриваме от масива, числото на подадения индекс 
            this.size--;                                    // Намаляме големината на масива с единица
        } else {                                            // Ако индекса е извън размера на масива
            throw new Error('Invalid index')                // Хвърляме грешка със съобщение за невалиден индекс
        }
    }
    get(index) {                                            // Добавяме метод на класа get, който приема параметър индекс 
        if (index >= 0 && index < this.numbers.length) {    // Ако индекса е по-голям или равен на 0 и е по-малък от големината
            return this.numbers[index];                     // Връщаме числото от масива на дадения индекс 
        } else {                                            // Ако индекса е извън размера на масива
            throw new Error('Invalid index')                // Хвърляме грешка със съобщение за невалиден индекс 
        }
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
console.log(list.size);
