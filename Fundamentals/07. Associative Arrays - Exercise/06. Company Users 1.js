function companyUsers(arr) {
    let companies = {};
    arr.forEach((line) => {
        let [company, employee] = line.split(" -> ");
        companies[company] === undefined ? companies[company] = [] : null;
        !companies[company].includes(employee) ? companies[company].push(employee) : null;
    });
    let sorted = Object.entries(companies).sort((a, b) => a[0].localeCompare(b[0]));
    for (let [company, employees] of sorted) {
        console.log(company);
        employees.forEach((employee) => console.log(`-- ${employee}`));
    }
}
