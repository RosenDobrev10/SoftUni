function filterEmployees(data, criteria) {
    data = JSON.parse(data);    // Парсваме JSON към обект 
    const [criteriaOne, criteriaTwo] = criteria.split("-"); // Взимаме първия критерий и втория критерий от получения масив след сплит 
    let employees = data.filter((employee) => employee[criteriaOne] === criteriaTwo);   // Филтрираме служителите 
    employees.forEach((employee, i) => console.log(`${i++}. ${employee.first_name} ${employee.last_name} - ${employee.email}`));
    // Печатаме за всеки служител от служителите, неговия номер, име и имейл 
}
