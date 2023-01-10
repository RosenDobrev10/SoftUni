function daysInAMonth(month, year) {

    let date = new Date(year, month, 0);
    return date.getDate();
}
console.log(daysInAMonth(1, 2012));
console.log(daysInAMonth(2, 2021));
