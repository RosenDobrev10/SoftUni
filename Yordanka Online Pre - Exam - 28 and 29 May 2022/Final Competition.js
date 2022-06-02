function finalCompetition(input) {
    let dancers = Number(input[0]);
    let points = Number(input[1]);
    let season = input[2];
    let place = input[3];
    let earnMoney = 0;
    let expenses = 0;

    if (place === "Bulgaria") {
        earnMoney = dancers * points;
        if (season === "summer") {
            expenses = (5 / 100) * earnMoney;
            earnMoney -= expenses;
        } else {
            expenses = (8 / 100) * earnMoney;
            earnMoney -= expenses;
        }
    } else {
        earnMoney = dancers * points;
        earnMoney *= 1.5;
        if (season === "summer") {
            expenses = (10 / 100) * earnMoney;
            earnMoney -= expenses;
        } else {
            expenses = (15 / 100) * earnMoney;
            earnMoney -= expenses;
        }
    }
    let charity = earnMoney * 0.75;
    let moneyPerDancer = (earnMoney - charity) / dancers;
    console.log(`Charity - ${charity.toFixed(2)}`);
    console.log(`Money per dancer - ${moneyPerDancer.toFixed(2)}`);
}
finalCompetition(["25", "98", "winter", "Bulgaria"]);
