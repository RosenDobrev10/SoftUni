function BasketballEquipment(input) {
    let taxYear = Number(input[0]);
    let Snickers = taxYear - taxYear * 0.4;
    let Ekip = Snickers - Snickers * 0.2;
    let Ball = Ekip * 0.25;
    let Accessories = Ball * 0.2;
    let All = taxYear + Snickers + Ekip + Ball + Accessories;
    console.log(All);
}
BasketballEquipment(["550"]);
