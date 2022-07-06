function reverseAnArrayofNumbers(number, array) {
    let newArray = [];                       // Създаваме празен масив, в който ще запазваме толкова данни от масива, колкото се искат
    for (let i = number - 1 ; i >= 0; i--) { // Започваме масива от числото number до началото на масива 
      newArray.push(array[i]);            // push = Добавя стойности към масив
    }
  
    console.log(newArray.join(" "));
  }
reverseAnArrayofNumbers(3, [10, 20, 30, 40, 50]);
reverseAnArrayofNumbers(4, [-1, 20, 99, 5]);
reverseAnArrayofNumbers(2, [66, 43, 75, 89, 47]);
