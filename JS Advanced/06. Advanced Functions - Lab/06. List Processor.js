function listProcessor(input) {

    let arr = [];   // Създаваме масив, в който ще пазим думите 

    let result = {  // Създаваме обект от функции 
        add: (string) => arr.push(string),                              // Към думите, добавя подадения стринг 
        remove: (string) => (arr = arr.filter((el) => el !== string)),  // Филтрира масива, като остая само различните от подадения стринг 
        print: () => console.log(arr.join(",")),                        // Печата, думите съединени по запетая 
    };

    input.forEach((line) => {                       // Минаваме по всяка линия от инпута 
        const [command, value] = line.split(" ");   // Създаваме две променливи command и value 
        result[command](value);                     // Изпълняваме всяка функция от обекта с параметъра от инпута 
    });
}
listProcessor(["add hello", "add again", "remove hello", "add again", "print"]);
listProcessor(["add pesho", "add george", "add peter", "remove peter", "print",]);
