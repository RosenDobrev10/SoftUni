function filterEmployees(data, criteria) {

    let [criteriaWord, criteriaValue] = criteria.split("-");
    // Деструктурираме критерия като я сплитваме по тире и получаваме по какво ни е критерия и каква стойност търсим

    JSON.parse(data)    // Получаваме като вход JSON и го парсваме да получим обекти 
        .filter((employee) => employee[criteriaWord] === criteriaValue)
        // филтрираме по всеки служител, ако от обекта дадения служител вземем думата по която филтрираме и е равна по стойност 
        .forEach((employee, number) => console.log(`${number++}. ${employee.first_name} ${employee.last_name} - ${employee.email}`));
        // За всеки служител правим и число. Печатаме числото като го инкрементираме и след това достъпваме първо име, фамилия и мейл 
}
filterEmployees(
    `[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
    }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
    },
    {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
    }]`,

    "gender-Female"
);

filterEmployees(
    `[{

    "id": "1",
    
    "first_name": "Kaylee",
    
    "last_name": "Johnson",
    
    "email": "k0@cnn.com",
    
    "gender": "Female"
    
    }, {"id": "2", "first_name": "Kizzee", "last_name": "Johnson", "email": "kjost1@forbes.com", "gender": "Female" }, { "id": "3", "first_name": "Evanne", "last_name": "Maldin", "email": "emaldin2@hostgator.com", "gender": "Male" }, { "id": "4", "first_name": "Evanne", "last_name": "Johnson", "email": "ev2@hostgator.com", "gender": "Male" }]`,
    "last_name-Johnson"
);
