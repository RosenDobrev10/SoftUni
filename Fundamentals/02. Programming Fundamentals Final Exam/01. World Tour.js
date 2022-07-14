function worldTour(input) {

    let tourList = input.shift();                           // Взимаме от инпута стринга с градове 

    while (input[0] !== "Travel") {                         // Въртим цикъла докато получим на нулев индекс Travel 
        let line = input.shift().split(":");                // Взимаме от инпута, елемент и го сплитваме по :
        let command = line[0];                              // Командата е на нулев индекс от линията 

        if (command === "Add Stop") {                       // Ако командата е Add Stop 
            let index = Number(line[1]);                    // Индекса ни е на първи индекс от линията 
            let string = line[2];                           // Стринга ни е на втори индекс 
            if (index >= 0 && index < tourList.length) {    // Ако индекса ни е в рамките на стринга 
                let start = tourList.substring(0, index);   // Началото е от 0 до индекса 
                let end = tourList.substring(index);        // Краят ни е от индекса до края 
                tourList = start + string + end;            // Новия ни списък е старта + стринга + края 
            }
            console.log(tourList);                          // Печатаме списъка 

        } else if (command === "Remove Stop") {             // Ако командата е Remove Stop
            let startIndex = Number(line[1]);               // Стартовия индекс ни е на първи индекс от линията 
            let endIndex = Number(line[2]);                 // Крайният индекс ни е на втори индекс от линията    
            if (startIndex >= 0 && startIndex < tourList.length && endIndex >= 0 && endIndex < tourList.length) {
                // Ако стартовия индекс е в рамките на стринга и крайният индекс е в рамките на стринга 
                let start = tourList.substring(0, startIndex);  // Началото е от 0 до индекса
                let end = tourList.substring(endIndex + 1);     // Краят ни е от индекса + 1 до края
                tourList = start + end;                         // Новия ни списък е от началото + края 
            }
            console.log(tourList);                          // Печатаме списъка 

        } else if (command === "Switch") {                  // Ако командата е Switch
            let oldString = line[1];                        // Стария стринг ни е на първи индекс от линията 
            let newString = line[2];                        // Новия стринг ни е на втори индекс от линията
            if (tourList.includes(oldString)) {             // Ако стария стринг се съдържа в списъка     
                tourList = tourList.split(oldString).join(newString);   // го заменятаме на всички места с новия списък 
            }       
            console.log(tourList);                          // Печатаме списъка 
        }       
    }
    console.log(`Ready for world tour! Planned stops: ${tourList}`);
}
worldTour([
"Hawai::Cyprys-Greece",
"Add Stop:7:Rome",
"Remove Stop:11:16",
"Switch:Hawai:Bulgaria",
"Travel",]);