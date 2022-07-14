function rotateArray(array) {
    let rotations = Number(array.pop());    // Последният елемент от масива е броя ротации на масива
    for (let index = 0; index < rotations; index++) {   // Правим цикъл с броя нужни ротации 
        let popped = array.pop();  // Взимаме последния елемент и го запазваме в променлива
        array.unshift(popped);    // Взетият елемент го слагаме на първа позиция. unshift = Слага елемента на първо място в масива 
    }
    console.log(array.join(" "));
}
rotateArray(["1", "2", "3", "4", "2"]);
rotateArray(["Banana", "Orange", "Coconut", "Apple", "15"]);
 