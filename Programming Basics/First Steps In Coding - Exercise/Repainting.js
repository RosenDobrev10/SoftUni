function Repainting(input) {
    let Nailon = 1.5;
    let Paint = 14.5;
    let Razreditel = 5;
    let Qnailon = Number(input[0]);
    let QPaint = Number(input[1]);
    let qRazreditel = Number(input[2]);
    let hours = Number(input[3]);

    let Extranailon = 2;
    let Extrapaint = 10 * QPaint;
    let Extrapackage = 0.4;

    let moneyNailon = (Qnailon + Extranailon) * Nailon;
    let moneyPaint = (QPaint + Extrapaint / 100) * Paint;
    let moneyRazreditel = qRazreditel * Razreditel;
    let All = moneyNailon + moneyPaint + Extrapackage + moneyRazreditel;
    let MoneyWorkHour = All * (30 / 100);
    let MoneyWork = hours * MoneyWorkHour;
    let finalprice = MoneyWork + All;

    console.log(finalprice);
}
Repainting(["10", "11", "4", "8"]);
