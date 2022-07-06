function movingTarget(input) {

    let targets = input.shift().split(" ").map(Number)  // Взимаме мишените, делим ги по интервал и ги правим на числа 
    
    while (input[0] !== "End"){                         // Докато не получим команда End, въртим цикъла 
        let currentCommand = input.shift().split(" ")   // Взимаме настоящата команда и я делим по интервал
        let command = currentCommand[0]                 // на нулевия индекс винаги ни стои командата 
        let index = Number(currentCommand[1])           // на първи индекс е индекса, по който трябва да изпълним командата 
        let value = Number(currentCommand[2])           // на втори индекс е стойността 

        switch(command){
            case "Shoot":
                if (index >= 0 && index < targets.length) { // Проверяваме дали индекса ни е валиден от 0 до последния индекс от мишените 
                    targets[index] -= value                 // от стойността на дадената мишена вадим, стойността с която сме я поразили 
                    if (targets[index] <= 0){               // Ако стойността стане по-малка или равна на 0 
                        targets.splice(index, 1)            // я премахваме 
                    }
                }
                break;
            case "Add":
                if (index >= 0 && index < targets.length) { // Проверяваме дали индекса ни е валиден от 0 до последния индекс от мишените
                    targets.splice(index, 0, value)         // Добавяме мишената на дадения ни индекс 
                } else {                                    // Ако индекса е невалиден 
                    console.log("Invalid placement!")       // Печатаме, че индекса е невалиден 
                }
                break;
            case "Strike":
                if (index + value < targets.length && index - value >= 0){  // Ако индекса + стойността или индекса - стойността попадат в масива с мишените 
                    targets.splice(index - value, value * 2 + 1)    // Почваме от индекса - стойността и трием 2 пъти стойностите(отляво и отдясно) и един път самата стойност 
                } else {                                            // Ако индексите са извън посочените 
                    console.log("Strike missed!")                  // Печатаме, че сме пропуснали страйк
                }
                break;
        }
    }
    console.log(targets.join("|"))
}
//movingTarget([ "52 74 23 44 96 110", "Shoot 5 10", "Shoot 1 80", "Strike 2 1", "Add 22 3", "End",]);
movingTarget(["1 2 3 4 5", "Strike 0 1", "End"]);
