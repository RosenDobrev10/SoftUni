function companyUsers(input) {

    let companies = {}; 	                        // Правим празен обект, в който ще слагаме компаниите 

    for (let element of input) {                    // Минаваме по елементите от инпута
        let [company, id] = element.split(" -> ");  // разделяме по компания и по ID
        if (!companies.hasOwnProperty(company)) {   // Ако няма такава компания, я създаваме с масив от ID-ta 
            companies[company] = [];                // я създаваме с масив от ID-ta 
        }
        if (!companies[company].includes(id)) {     // Ако в масив с ID-ta, няма такова добавено още 
            companies[company].push(id);            // Добавяме към масива, даденото ни ID 
        }
    }

    let sorted = Object.keys(companies).sort();     // Сортираме компаниите по азбучен ред 

    for (let company of sorted) {                   // Минаваме по компаниите от сортирания масив 
        console.log(company);                       // Печатаме компанията 
        for (let id of companies[company]) {        // Минаваме по ID-tata от масива с ID-tata 
            console.log(`-- ${id}`);                // Печатаме всяко ID 
        }
    }
}
companyUsers([
    "SoftUni -> AA12345",
    "SoftUni -> BB12345",
    "Microsoft -> CC12345",
    "HP -> BB12345",
]);
