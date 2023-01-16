function townPopulation(arr) {
    const cities = {};
    arr.forEach(line => {
        let [city, population] = line.split(" <-> ");
        cities[city] ? cities[city] += Number(population) : cities[city] = Number(population);
    });
    Object.keys(cities).forEach((city) => console.log(`${city} : ${cities[city]}`));
}
