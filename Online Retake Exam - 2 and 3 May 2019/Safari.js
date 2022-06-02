function safari(input) {
    let budget = Number(input[0]);
    let litersFuel = Number(input[1]);
    let day = input[2];
    let money = 0;
    if (day === "Saturday") {
        money = (100 + litersFuel * 2.1) * 0.9;
    } else {
        money = (100 + litersFuel * 2.1) * 0.8;
    }
    let diff = Math.abs(budget - money);
    if (budget >= money) {
        console.log(`Safari time! Money left: ${diff.toFixed(2)} lv.`);
    } else {
        console.log(`Not enough money! Money needed: ${diff.toFixed(2)} lv.`);
    }
}
safari(["105.20", "15", "Sunday"]);
