function skiTrip(input) {
  let days = Number(input[0]);
  let room = input[1];
  let grade = input[2];

  let nights = days - 1;

  let roomForOnePerson = 18;
  let apartment = 25;
  let presidentApartment = 35;
  let price = 0;

  if (days < 10) {
    if (room === "room for one person") {
      price = nights * roomForOnePerson;
    } else if (room === "apartment") {
      price = nights * apartment * 0.7;
    } else {
      price = nights * presidentApartment * 0.9;
    }
  } else if (days >= 10 && days <= 15) {
    if (room === "room for one person") {
      price = nights * roomForOnePerson;
    } else if (room === "apartment") {
      price = nights * apartment * 0.65;
    } else {
      price = nights * presidentApartment * 0.85;
    }
  } else if (days > 15) {
    if (room === "room for one person") {
      price = nights * roomForOnePerson;
    } else if (room === "apartment") {
      price = nights * apartment * 0.5;
    } else {
      price = nights * presidentApartment * 0.8;
    }
  }
  if (grade === "positive") {
    price = price * 1.25;
  } else {
    price = price * 0.9;
  }
  console.log(price.toFixed(2));
}
skiTrip(["2", "apartment", "positive"]);
