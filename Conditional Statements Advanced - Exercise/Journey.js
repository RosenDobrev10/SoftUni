function journey(input) {
  let budget = Number(input[0]);
  let season = input[1];

  let destination;
  let campOrHotel;
  let spentMoney = 0.0;

  if (budget <= 100) {
    destination = "Bulgaria";
    if (season === "summer") {
      spentMoney = 0.3 * budget;
      campOrHotel = "Camp";
    } else {
      spentMoney = 0.7 * budget;
      campOrHotel = "Hotel";
    }
  } else if (budget <= 1000) {
    destination = "Balkans";
    if (season === "summer") {
      spentMoney = 0.4 * budget;
      campOrHotel = "Camp";
    } else {
      spentMoney = 0.8 * budget;
      campOrHotel = "Hotel";
    }
  } else if (budget > 1000) {
    destination = "Europe";
    spentMoney = 0.9 * budget;
    campOrHotel = "Hotel";
  }
  console.log(`Somewhere in ${destination}`);
  console.log(`${campOrHotel} - ${spentMoney.toFixed(2)}`);
}
journey(["50", "summer"]);
