function townsToJSON(array) {

    let towns = [];

    class Town {
        constructor(town, latitude, longitude) {
            this.Town = town;
            this.Latitude = Number(latitude);
            this.Longitude = Number(longitude);
        }
    }

    for (let i = 1; i < array.length; i++) {
        let newArray = array[i]
            .split("|")
            .map((el) => el.trim())
            .filter((el) => el.length !== 0);
        let townName = newArray[0];
        let latitude = Number(newArray[1]).toFixed(2);
        let longitude = Number(newArray[2]).toFixed(2);
        let town = new Town(townName, latitude, longitude);
        towns.push(town);
    }
    console.log(JSON.stringify(towns));
}
townsToJSON([
    "| Town | Latitude | Longitude |",
    "| Sofia | 42.696552 | 23.32601 |",
    "| Beijing | 39.913818 | 116.363625 |",
]);

townsToJSON([
    "| Town | Latitude | Longitude |",
    "| Veliko Turnovo | 43.0757 | 25.6172 |",
    "| Monatevideo | 34.50 | 56.11 |",
]);
