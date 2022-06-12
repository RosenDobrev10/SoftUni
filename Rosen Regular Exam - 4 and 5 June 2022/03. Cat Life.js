function catLife(input) {
  let breed = input[0];
  let gender = input[1];
  let yearsToLive = 0;

  switch (breed) {
    case "British Shorthair":
      gender === "m" ? (yearsToLive = 13) : (yearsToLive = 14);
      break;
    case "Siamese":
      gender === "m" ? (yearsToLive = 15) : (yearsToLive = 16);
      break;
    case "Persian":
      gender === "m" ? (yearsToLive = 14) : (yearsToLive = 15);
      break;
    case "Ragdoll":
      gender === "m" ? (yearsToLive = 16) : (yearsToLive = 17);
      break;
    case "American Shorthair":
      gender === "m" ? (yearsToLive = 12) : (yearsToLive = 13);
      break;
    case "Siberian":
      gender === "m" ? (yearsToLive = 11) : (yearsToLive = 12);
      break;
    default:
      console.log(`${breed} is invalid cat!`);
      return;
  }
  let catMonths = Math.floor((yearsToLive * 12) / 6);
  console.log(`${catMonths} cat months`);
}
catLife(["Persian", "m"]);
catLife(["Siamese", "f"]);
catLife(["Siberian", "m"]);
catLife(["Ragdoll", "f"]);
catLife(["Tom", "m"]);
