function fuelTank2(input) {
  let typeFuel = input[0];
  let litersFuel = Number(input[1]);
  let clubCard = input[2];

  let priceGasoline = 2.22;
  let priceDiesel = 2.33;
  let priceGas = 0.93;

  if (clubCard === "Yes" && typeFuel === "Gasoline") {
    priceGasoline -= 0.18;
  } else if (clubCard === "Yes" && typeFuel === "Diesel") {
    priceDiesel -= 0.12;
  } else if (clubCard === "Yes" && typeFuel === "Gas") {
    priceGas -= 0.08;
  }
  let finalPriceGasoline = litersFuel * priceGasoline;
  let finalPriceDiesel = litersFuel * priceDiesel;
  let finalPriceGas = litersFuel * priceGas;

  if (litersFuel >= 20 && litersFuel <= 25) {
    finalPriceGasoline = finalPriceGasoline - finalPriceGasoline * 0.08;
    finalPriceDiesel = finalPriceDiesel - finalPriceDiesel * 0.08;
    finalPriceGas = finalPriceGas - finalPriceGas * 0.08;
  } else if (litersFuel > 25) {
    finalPriceGasoline -= finalPriceGasoline * 0.1;
    finalPriceDiesel -= finalPriceDiesel * 0.1;
    finalPriceGas -= finalPriceGas * 0.1;
  }
  if (typeFuel === "Gasoline") {
    console.log(`${finalPriceGasoline.toFixed(2)} lv.`);
  } else if (typeFuel === "Diesel") {
    console.log(`${finalPriceDiesel.toFixed(2)} lv.`);
  } else if (typeFuel === "Gas") {
    console.log(`${finalPriceGas.toFixed(2)} lv.`);
  }
}
fuelTank2(["Diesel", "19", "No"]);
