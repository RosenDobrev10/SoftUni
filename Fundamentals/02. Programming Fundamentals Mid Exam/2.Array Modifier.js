function arrayModifier(array){

    let initialValues = array.shift().split(" ").map(Number) // Взимаме първия елемент от масива, разделяме го по интервал и ги парсваме към числа 

    while (array[0] !== "end"){
        let currentCommand = array.shift().split(" ")  // Взимаме първия елемент от оставащия масив и го по разстояние 
        let command = currentCommand[0]                // На нулев индекс, стои самата команда  
        let index1 = Number(currentCommand[1])         // Взимаме индекс 1
        let index2 = Number(currentCommand[2])         // Взимаме индекс 2

        switch(command){

            case "swap":
                let temp = initialValues[index1]                // Създаваме си помощна трета променлива, в която пазим стойност 
                initialValues[index1] = initialValues[index2]   // Създаваме си триъгълник за размяна на числа по места 
                initialValues[index2] = temp    // a -> c  b -> a   c--> b
                break;

            case "multiply":
                initialValues[index1] *= initialValues[index2] // Умножаваме индекс 1 по индекс 2 и резултата запазваме в индекс 1                        
                break;

            case "decrease":        
                for (let i = 0; i < initialValues.length; i++){ // Правим цикъл, който да мине по наличните ни числа към момента 
                    initialValues[i]--                          // Намаляваме стойността на всяко число от масива с единица 
                }
                break;
        }
    }
    console.log(initialValues.join(", "));
}
arrayModifier([

    '23 -2 321 87 42 90 -123',
    
    'swap 1 3',
    
    'swap 3 6',
    
    'swap 1 0',
    
    'multiply 1 2',
    
    'multiply 2 1',
    
    'decrease',
    
    'end'
    
    ])