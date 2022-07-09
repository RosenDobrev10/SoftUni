function carFactory(car){

    const modelcar = {
        model: null,
        engine: {power: null, volume: null},
        carriage: {type: null, color: null},
        wheels: [],
    }
    modelcar.model = car.model

    if (car.power <= 90){
        modelcar.engine.power = 90
        modelcar.engine.volume = 1800
    } else if (car.power <= 120){
        modelcar.engine.power = 120
        modelcar.engine.volume = 2400
    } else if (car.power <= 200){
        modelcar.engine.power = 200
        modelcar.engine.volume = 3500
    }

    modelcar.carriage.type = car.carriage
    modelcar.carriage.color = car.color

    if ( car.wheelsize % 2 === 0){
        car.wheelsize--
    }
    modelcar.wheels.push(car.wheelsize, car.wheelsize, car.wheelsize, car.wheelsize)

    return modelcar
}
carFactory({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 })

carFactory({ model: 'Opel Vectra',

power: 110,

color: 'grey',

carriage: 'coupe',

wheelsize: 17 })