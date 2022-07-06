function sorting(array) {
    let sorted = array.sort((a, b) => a - b);   // Сортираме числата в масива по възходящ ред 
    let output = [];                            // Създаваме празен масив, за да добавяме числата 

    while (sorted.length > 0) {              // Правим цикъл, докато числата от масива свършат
        let biggest = sorted.pop();          // Изваждаме най-голямото число към момента, като взимаме от края на масива 
        output.push(biggest);                // Добавяме го
        let smallest = sorted.shift();       // Изваждаме най-малкото число към момента, като взимаме от началото на масива 
        output.push(smallest);               // Добавамя го 
    }
    console.log(output.join(" "));
}
sorting([1, 21, 3, 52, 69, 63, 31, 2, 18, 94]);
//sorting([34, 2, 32, 45, 690, 6, 32, 7, 19, 47])
