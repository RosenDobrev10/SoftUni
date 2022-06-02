function flowers(input) {
    let hrizantemi = Number(input[0]);
    let roses = Number(input[1]);
    let tulips = Number(input[2]);
    let season = input[3];
    let isHoliday = input[4];

    let priceHrizantemi = 0;
    let priceRoses = 0;
    let priceTulips = 0;

    switch (season) {
        case "Spring":
        case "Summer":
            priceHrizantemi = hrizantemi * 2;
            priceRoses = roses * 4.1;
            priceTulips = tulips * 2.5;
            break;
        case "Autumn":
        case "Winter":
            priceHrizantemi = hrizantemi * 3.75;
            priceRoses = roses * 4.5;
            priceTulips = tulips * 4.15;
            break;
    }
    if (isHoliday === "Y") {
        priceHrizantemi *= 1.15;
        priceRoses *= 1.15;
        priceTulips *= 1.15;
    }
    let buquet = priceHrizantemi + priceRoses + priceTulips;
    let allFlowers = hrizantemi + roses + tulips;

    if (tulips > 7 && season === "Spring") {
        buquet *= 0.95;
    } else if (roses >= 10 && season === "Winter") {
        buquet *= 0.9;
    }
    if (allFlowers > 20) {
        buquet *= 0.8;
    }
    let price = buquet + 2;
    console.log(price.toFixed(2));
}
flowers(["3", "10", "9", "Winter", "N"]);
