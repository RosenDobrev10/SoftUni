function birthdayParty(input) {
    let rent = Number(input[0]);
    let cake = 0.2 * rent;
    let drinks = 0.55 * cake;
    let animator = 1 / 3 * rent;
    let all = animator + drinks + cake + rent;
    console.log(all);
}
birthdayParty(["2250"]);
