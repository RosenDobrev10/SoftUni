function extensibleObject() {

    let prototype = {};                         // Създаваме си прототип като обект 
    let instance = Object.create(prototype);    
    // Създаваме си инстанция от прототипа(Тя ще наследи всички пропъртита и методи от прототипа)        

    instance.extend = function (template) {                     // Създаваме си метод extend на инстанцията, който приема друг обект(template)
        Object.entries(template).forEach(([key, value]) => {    // Взимаме всички, KVP на обекта template и минаваме по тях 
            if (typeof value === "function") {                  // Ако value e функция(метод)
                prototype[key] = value;                         // Я добавяме към прототипа
            } else {                                            // Ако value не е функция(пропърти)
                instance[key] = value;                          // го добавяме към инстанцията
            }
        });
    };
    return instance; // Накрая връщаме инстанцията с всички копирани методи от прототипа и копирани пропъртита от получения обект 
}

const myObj = extensibleObject();
console.log(myObj);
console.log(Object.getPrototypeOf(myObj));
const template = {
    extensionMethod: function () { },
    extensionProperty: "someString",
};
myObj.extend(template);
console.log(Object.getPrototypeOf(myObj));
console.log(myObj);
