class Garden {
  constructor(spaceAvailable) {               // Конструктора получава само един параметър 
    this.spaceAvailable = spaceAvailable;     // Сетваме го 
    this.plants = [];                         // Създаваме още две пропъртита, които са празни масиви 
    this.storage = [];                        // Създаваме още две пропъртита, които са празни масиви 
  }

  addPlant(plantName, spaceRequired) {                // Създаваме метод addPlant, който приема 2 параметъра 
    if (this.spaceAvailable < spaceRequired) {            // Ако мястото от конструктора е по-малко от нужното място като параметър 
      throw new Error("Not enough space in the garden."); // Хвърляме грешка
    }                                                     
    let plant = {                                         // Създаваме обект със следните свойства 
      plantName,                                          // Подаденото име от параметъра 
      spaceRequired,                                      // Подаденото нужно място от параметъра 
      ripe: false,                                        // По условие го сетваме да е false 
      quantity: 0,                                        // По условие го сетваме да е 0
    };
    this.plants.push(plant);                              // Добавяме към масива с растения, създадения обект 
    this.spaceAvailable -= plant.spaceRequired;           // От свободното място изваждаме нужното място за растението
    return `The ${plantName} has been successfully planted in the garden.`; // Връщаме съобщение 
  }

  ripenPlant(plantName, quantity) {                                 // Създаваме метод ripenPlant, приема 2 параметъра 
    let plant = this.plants.find((p) => p.plantName === plantName); // Намираме в масива, името на растението, което ни е подадено и го взимаме като променлива 
    if (this.plants.includes(plant) === false) {                  // Ако в масива, няма такова растение 
      throw new Error(`There is no ${plantName} in the garden.`); // Хвърляме грешка 
    }
    if (plant.ripe === true) {                                    // Ако растението вече е узряло 
      throw new Error(`The ${plantName} is already ripe.`);       // Хвърляме грешка 
    }
    if (quantity <= 0) {                                          // Ако количеството е по-малко или равно на 0 
      throw new Error(`The quantity cannot be zero or negative.`);  // хвърляме грешка 
    }
    plant.ripe = true;                                             // Ако всичко това не е изпълненое, сетваме пропъртито му на true 
    plant.quantity += quantity;                                    // Увеличаваме количеството му с подаденото от параметъра 
    if (quantity === 1) {                                           // Ако количеството е 1 
      return `${quantity} ${plantName} has successfully ripened.`;  // Връщаме съобщение за 1 узряло растение
    } else {                                                        // Ако количеството е по-голямо от 1 
      return `${quantity} ${plantName}s have successfully ripened.`;  // Връщаме съобщение за повече от 1 узряло растение
    }
  }

  harvestPlant(plantName) {                                             // Създаваме метод harvestPlant
    let plant = this.plants.find((p) => p.plantName === plantName); // Намираме в масива, името на растението, което ни е подадено и го взимаме като променлива 
    if (this.plants.includes(plant) === false) {                    // Ако в масива, няма такова растение 
      throw new Error(`There is no ${plantName} in the garden.`);   // Хвърляме грешка
    }
    if (plant.ripe === false) {                                     // Ако растението не е узряло 
      throw new Error(`The ${plantName} cannot be harvested before it is ripe.`); // Хвърляме грешка 
    }
    let indexOfPlant = this.plants.indexOf(plant);                  // Намираме индекса, на който се намира растението в масива 
    this.plants.splice(indexOfPlant, 1);                            // със splice, го изтриваме по индекса 
    let harvestedPlant = {                                          // Създаваме променлива за събраното растение 
      plantName,                                                    // То има пропърти подаденото име 
      quantity: plant.quantity,                                     // Количество, което е равно на неговото
    };
    this.storage.push(harvestedPlant);                              // Добавяме събраното растение в масива със събраните 
    this.spaceAvailable += plant.spaceRequired;                     // Освобождаме място, с толкова колкото му е било нужно 
    return `The ${plantName} has been successfully harvested.`;     // Връщаме съобщение 
  }

  generateReport() {                                                       // Създаваме метод generateReport
    let report = [];                                                       // Създаваме празен масив, за крайното съобщение 
    report.push(`The garden has ${this.spaceAvailable} free space left.`); // Добавяме първия ред от съобщението

    let plantsInGarden = this.plants.map((plant) => plant.plantName);       
    // Минаваме по масива с растенията, които са обекти и чрез map модифицираме масива, като изваждаме само имената и получаваме нов масив 
    plantsInGarden.sort((a, b) => a.localeCompare(b));                      // Сортираме ги по имена във възходящ ред
    let secondRow = `Plants in the garden: ${plantsInGarden.join(", ")}`;   // Втория ред е равен на съобщението и масива joinat по запетая и интервал 
    report.push(secondRow);                                                 // Добавяме втория ред от съобщението

    let thirdRow = `Plants in storage: The storage is empty.`;              // Ако няма растения в storage сетваме това съобщение за трети ред 
    if (this.storage.length !== 0) {                                        // Ако storage не е празен масив 
      let plantsInStorage = this.storage.map((p) => `${p.plantName} (${p.quantity})`);
      // Минаваме по масива с растенията в storage, които са обекти и чрез map модифицираме масива, като изваждаме името и в скоби количеството и получаваме нов масив
      thirdRow = `Plants in storage: ${plantsInStorage.join(", ")}`;      // Третия ред е равен на съобщението и масива joinat по запетая и интервал
    }
    report.push(thirdRow);                                                  // Добавяме третия ред от съобщението

    return report.join("\n");       // Масива със съобщенията го joinvame по символа за нов ред 
  }
}

const myGarden = new Garden(250);

console.log(myGarden.addPlant("apple", 20));

console.log(myGarden.addPlant("orange", 200));

console.log(myGarden.addPlant("raspberry", 10));

console.log(myGarden.ripenPlant("apple", 10));

console.log(myGarden.ripenPlant("orange", 1));

console.log(myGarden.harvestPlant("orange"));

console.log(myGarden.generateReport());
