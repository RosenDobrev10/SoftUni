function GodzillavsKong(input) {
  let budget = Number(input[0]);
  let statists = Number(input[1]);
  let clothesStatist = Number(input[2]);

  let decor = 0.1 * budget;

  if (statists > 150) {
    clothesStatist = clothesStatist - 0.1 * clothesStatist;
  }
  let allMoney = decor + statists * clothesStatist;
  let diff = Math.abs(budget - allMoney);
  if (allMoney > budget) {
    console.log("Not enough money!");
    console.log(`Wingard needs ${diff.toFixed(2)} leva more.`);
  } else {
    console.log("Action!");
    console.log(`Wingard starts filming with ${diff.toFixed(2)} leva left.`);
  }
}
GodzillavsKong(["9587.88", "222", "55.68"]);
