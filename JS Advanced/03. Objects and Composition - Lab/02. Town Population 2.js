function townPopulation(arr) {
    const cities = {};
    arr.forEach(line => {
        let [city, population] = line.split(" <-> ");
        population = Number(population);
        cities[city] ? cities[city] += population : cities[city] = population;
    });
    for (let city in cities){
        console.log(`${city} : ${cities[city]}`);
    }
}
