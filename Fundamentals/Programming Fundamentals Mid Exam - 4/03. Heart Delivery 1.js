function heartDelivery(arr) {
    let neighborhood = arr.shift().split("@").map(Number);
    let index = 0;
    while (arr[0] !== "Love!") {
        let [command, length] = arr.shift().split(" ").map(Number);
        index + length >= neighborhood.length ? (index = 0) : (index += length);
        neighborhood[index] <= 0 ? console.log(`Place ${index} already had Valentine's day.`) : null;
        neighborhood[index] -= 2;
        neighborhood[index] === 0 ? console.log(`Place ${index} has Valentine's day.`) : null;
    }
    console.log(`Cupid's last position was ${index}.`);
    let failedHouses = neighborhood.filter((house) => house > 0);
    failedHouses.length === 0 ? console.log("Mission was successful.") : console.log(`Cupid has failed ${failedHouses.length} places.`);
}
