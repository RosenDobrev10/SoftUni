function centuriesToMinutes(century) {
    let years = century * 100;
    let days = Math.trunc(century * 100 * 365.2422);
    let hours = days * 24;
    let minutes = hours * 60;
    console.log(`${century} centuries = ${years} years = ${days} days = ${hours} hours = ${minutes} minutes`);
}
centuriesToMinutes(1);
centuriesToMinutes(5);
