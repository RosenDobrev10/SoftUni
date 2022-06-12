function summerOutfit(input) {
    let degrees = Number(input[0]);
    let timeOfDay = input[1];

    let outfit;
    let shoes;

    if (degrees >= 10 && degrees <= 18 && timeOfDay === "Morning") {
        outfit = "Sweatshirt";
        shoes = "Sneakers";
    } else if (degrees >= 10 && degrees <= 18 && timeOfDay === "Afternoon") {
        outfit = "Shirt";
        shoes = "Moccasins";
    } else if (degrees >= 10 && degrees <= 18 && timeOfDay === "Evening") {
        outfit = "Shirt";
        shoes = "Moccasins";
    } else if (degrees > 18 && degrees <= 24 && timeOfDay === "Morning") {
        outfit = "Shirt";
        shoes = "Moccasins";
    } else if (degrees > 18 && degrees <= 24 && timeOfDay === "Afternoon") {
        outfit = "T-Shirt";
        shoes = "Sandals";
    } else if (degrees > 18 && degrees <= 24 && timeOfDay === "Evening") {
        outfit = "Shirt";
        shoes = "Moccasins";
    } else if (degrees >= 25 && timeOfDay === "Morning") {
        outfit = "T-Shirt";
        shoes = "Sandals";
    } else if (degrees >= 25 && timeOfDay === "Afternoon") {
        outfit = "Swim Suit";
        shoes = "Barefoot";
    } else if (degrees >= 25 && timeOfDay === "Evening") {
        outfit = "Shirt";
        shoes = "Moccasins";
    }
    console.log(`It's ${degrees} degrees, get your ${outfit} and ${shoes}.`);
}
summerOutfit(["16", "Morning"]);
