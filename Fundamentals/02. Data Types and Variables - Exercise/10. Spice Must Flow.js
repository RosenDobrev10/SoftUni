function spiceMustFlow(startingYield) {
    
    let days = 0;
    let totalAmount = 0;
    while (startingYield >= 100) {
        days++;
        totalAmount += startingYield;
        totalAmount -= 26;
        startingYield -= 10;
    }

    if (totalAmount >= 26){      // Ако в склада има наличност от поне 26 подправки
    totalAmount -= 26;          // Работниците ще изядат 26 след края на работния ден.
    }

    console.log(days);
    console.log(totalAmount);
}
spiceMustFlow(111);
spiceMustFlow(450);
