function distinctArray(array) {
  let newArray = [];    // Правим нов масив, за да вкарваме стойности 

  for (let i of array) {    // Минаваме по масива, за да проверяваме 
    if (!newArray.includes(i)) {    // Проверяваме дали го има в масива, Ако го няма го обръщаме с ! в true 
        newArray.push(i);           // и го добавяме към масива
    }
  }
  console.log(newArray.join(" "));
}
//distinctArray([1, 2, 3, 4])
distinctArray([7, 8, 9, 7, 2, 3, 4, 1, 2]);
//distinctArray([20, 8, 12, 13, 4, 4, 8, 5])
