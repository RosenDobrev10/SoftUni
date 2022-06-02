function easterGuests(input) {
    let guests = Number(input[0]);
    let budget = Number(input[1]);

    let easterCakeMoney = 4 * Math.ceil(guests / 3);
    let eggsMoney = 0.45 * guests * 2;
    let allMoney = easterCakeMoney + eggsMoney;
    let diff = Math.abs(allMoney - budget);
    if (budget >= allMoney) {
        console.log(`Lyubo bought ${Math.ceil(guests / 3)} Easter bread and ${guests * 2} eggs.`);
        console.log(`He has ${diff.toFixed(2)} lv. left.`);
    } else {
        console.log("Lyubo doesn't have enough money.");
        console.log(`He needs ${diff.toFixed(2)} lv. more.`);
    }
}
easterGuests(["9", "12"]);
