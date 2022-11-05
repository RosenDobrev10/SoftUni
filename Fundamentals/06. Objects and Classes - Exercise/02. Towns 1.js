function towns(arr) {
    const towns = {};
    for (let line of arr) {
        const [name, latitude, longitude] = line.split(" | ");
        towns.town = name;
        towns.latitude = Number(latitude).toFixed(2);
        towns.longitude = Number(longitude).toFixed(2);
        console.log(towns);
    }
}
