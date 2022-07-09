function carFactory(car) {

    let engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 },
    ];

    let carriages = [
        { type: "hatchback", color: car.color },
        { type: "coupe", color: car.color },
    ];

    let wheelsize = car.wheelsize % 2 === 1 ? car.wheelsize : car.wheelsize - 1;

    return {
        model: car.model,
        engine: engines.filter((engine) => engine.power >= car.power)[0],
        carriage: carriages.filter((carriage) => carriage.type === car.carriage)[0],
        wheels: [wheelsize, wheelsize, wheelsize, wheelsize],
    };
}
carFactory({
    model: "VW Golf II",
    power: 90,
    color: "blue",
    carriage: "hatchback",
    wheelsize: 14,
});

carFactory({
    model: "Opel Vectra",
    power: 110,
    color: "grey",
    carriage: "coupe",
    wheelsize: 17,
});
