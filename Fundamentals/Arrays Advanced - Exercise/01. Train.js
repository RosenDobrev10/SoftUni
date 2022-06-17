function train(array) {
  let passengersInWagons = array.shift().split(" ").map(Number);    // Взимаме първия елемент, разделяме го по разстояние и го правим на число 
  let maxCapacity = Number(array.shift());  // Взимаме втория елемент от масива и го правим на число 

  for (let command of array) {  // Минаваме по целия останал масив 
    let currentCommand = command.split(" ");    // Взимаме текущата команда

    if (currentCommand[0] === "Add") {  // Ако на нулевия индекс от командата има Add 
        passengersInWagons.push(Number(currentCommand[1])); // Към вагоните добавяме още един вагон с броя пътници 
    } else {                                                // Ако има цифра, а не Add
      for (let j = 0; j < passengersInWagons.length; j++) { // Минаваме по всички вагони и търсим място за броя пътници 
        if (passengersInWagons[j] + Number(currentCommand[0]) <= maxCapacity) { // Ако сбора на текущия вагон и броя пътници е по-малък или равен на максималния капацитет 
            passengersInWagons[j] += Number(currentCommand[0]); // Към текущия вагон добавяме броя на пътниците 
          break;                                                // След като сме намерили вагон за пътниците прекъсваме и не търсим повече 
        }
      }
    }
  }
  console.log(passengersInWagons.join(" "));
}

train(["32 54 21 12 4 0 23", "75", "Add 10", "Add 0", "30", "10", "75"]);
//train(["0 0 0 10 2 4", "10", "Add 10", "10", "10", "10", "8", "6"]);