function listOfProducts(array) {
    let sorted = array.sort();      // sort подаден без параметър, подрежда по азбучен ред 
    for (let i = 0; i < sorted.length; i++) {   // Правим цикъл да обходим всички данни от масива 
        console.log(`${i + 1}.${sorted[i]}`);   // печатаме всеки елемент на нов ред вътре в масива, като брояча ни е i + 1
    }
}
listOfProducts(["Potatoes", "Tomatoes", "Onions", "Apples"]);
//listOfProducts(['Watermelon', 'Banana', 'Apples'])
