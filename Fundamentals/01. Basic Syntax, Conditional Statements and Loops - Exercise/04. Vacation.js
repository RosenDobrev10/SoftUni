function vacation(numberOfGroup, typeOfGroup, dayOfWeek) {
    
    let price = 0;
    switch (dayOfWeek) {
            
        case "Friday":
            if (typeOfGroup === "Students") {
                price = 8.45;
            } else if (typeOfGroup === "Business") {
                price = 10.9;
            } else if (typeOfGroup === "Regular") {
                price = 15;
            }
            break;
            
        case "Saturday":
            if (typeOfGroup === "Students") {
                price = 9.8;
            } else if (typeOfGroup === "Business") {
                price = 15.6;
            } else if (typeOfGroup === "Regular") {
                price = 20;
            }
            break;
            
        case "Sunday":
            if (typeOfGroup === "Students") {
                price = 10.46;
            } else if (typeOfGroup === "Business") {
                price = 16;
            } else if (typeOfGroup === "Regular") {
                price = 22.5;
            }
            break;
    }
    if (numberOfGroup >= 30 && typeOfGroup === "Students") {
        price *= 0.85;
    }
    if (numberOfGroup >= 100 && typeOfGroup === "Business") {
        numberOfGroup -= 10;
    }
    if (numberOfGroup >= 10 && numberOfGroup <= 20 && typeOfGroup === "Regular") {
        price *= 0.95;
    }
    console.log(`Total price: ${(price * numberOfGroup).toFixed(2)}`);
}
vacation(30, "Students", "Sunday");
vacation(40, "Regular", "Saturday");
