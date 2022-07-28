function concatenateNames(firstName, lastName, delimeter) {
    
    console.log(firstName + delimeter + lastName); // Конкатениране на стрингове чрез +
    console.log(`${firstName}${delimeter}${lastName}`); // Интерполация на стрингове чрез ``
}
concatenateNames("John", "Smith", "->");
concatenateNames("Jan", "White", "<->");
concatenateNames("Linda", "Terry", "=>");
