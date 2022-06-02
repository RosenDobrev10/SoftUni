function movieProfit(input) {
    let movie = input[0];
    let days = Number(input[1]);
    let tickets = Number(input[2]);
    let ticketPrice = Number(input[3]);
    let percentForCinema = Number(input[4]);

    let profit = tickets * ticketPrice * days;
    let finalProfit = profit - (profit * percentForCinema) / 100;
    console.log(`The profit from the movie ${movie} is ${finalProfit.toFixed(2)} lv.`);
}
movieProfit(["The Programmer", "20", "500", "7.50", "7"]);
