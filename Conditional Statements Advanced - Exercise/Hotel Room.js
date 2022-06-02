function hotelRoom(input) {
    let month = input[0];
    let nights = Number(input[1]);

    let apartmentCost = 0.0;
    let studioCost = 0.0;

    if (month === "May" || month === "October") {
        if (nights > 7 && nights <= 14) {
            studioCost = nights * 50 * 0.95;
            apartmentCost = nights * 65;
        } else if (nights > 14) {
            studioCost = nights * 50 * 0.7;
            apartmentCost = nights * 65 * 0.9;
        } else {
            studioCost = nights * 50;
            apartmentCost = nights * 65;
        }
    } else if (month === "June" || month === "September") {
        if (nights > 14) {
            studioCost = nights * 75.2 * 0.8;
            apartmentCost = nights * 68.7 * 0.9;
        } else {
            studioCost = nights * 75.2;
            apartmentCost = nights * 68.7;
        }
    } else if (month === "July" || month === "August") {
        if (nights > 14) {
            studioCost = nights * 76;
            apartmentCost = nights * 77 * 0.9;
        } else {
            studioCost = nights * 76;
            apartmentCost = nights * 77;
        }
    }
    console.log(`Apartment: ${apartmentCost.toFixed(2)} lv.`);
    console.log(`Studio: ${studioCost.toFixed(2)} lv.`);
}
hotelRoom(["May", "15"]);
