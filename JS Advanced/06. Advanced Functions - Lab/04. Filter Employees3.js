function filterEmployees(data, criteria) {
    const [criteriaOne, criteriaTwo] = criteria.split("-");
    JSON.parse(data).filter((employee) => employee[criteriaOne] === criteriaTwo).forEach((employee, i) => console.log(`${i++}. ${employee.first_name} ${employee.last_name} - ${employee.email}`));
}
