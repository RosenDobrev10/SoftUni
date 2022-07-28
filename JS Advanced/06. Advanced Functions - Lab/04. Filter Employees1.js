function filterEmployees(data, criteria) {

    data = JSON.parse(data);    // Парсваме JSON към обект 

    let criteriaOne = criteria.split("-")[0];   // Сплитваме и взимаме първата част 
    let criteriaTwo = criteria.split("-")[1];   // Сплитваме и взимаме втората част

    let employees = data.filter((employee) => employee[criteriaOne] === criteriaTwo);   // Филтрираме служителите 
    let number = 0; // Създаваме променлива като брояч за служителите 
    employees.forEach((employee) => console.log(`${number++}. ${employee.first_name} ${employee.last_name} - ${employee.email}`));
    // Печатаме за всеки служител от служителите, неговия номер, име и имейл 
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
    }, 
    {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Johnson",
    "email": "kjost1@forbes.com",
    "gender": "Female"
    }, 
    { 
    "id": "3",
    "first_name": "Evanne", 
    "last_name": "Maldin", 
    "email": "emaldin2@hostgator.com", 
    "gender": "Male" 
    }, 
    { 
    "id": "4", 
    "first_name": "Evanne", 
    "last_name": "Johnson", 
    "email": "ev2@hostgator.com", 
    "gender": "Male"
     }]`,
    "last_name-Johnson"
);
