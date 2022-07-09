function assemblyLine(){

    return {
        hasClima(car) {
            car.temp = 21
            car.tempSettings = 21
            car.adjustTemp = () => {
                if (car.temp < car.tempSettings){
                    car.temp++
                } else if (car.temp > car.tempSettings){
                    car.temp--
                }
            }
        },

        hasAudio(car) {
            car.currentTrack = null
            car.nowPlaying = () => {
                console.log(`Now playing '${car.currentTrack.name}' by ${car.currentTrack.artist}`)
            }
        },

        hasParktronic(car) {
            car.checkDistance = (distance) => {
                if (distance < 0.1){
                    console.log("Beep! Beep! Beep!")
                } else if (distance < 0.25){
                    console.log("Beep! Beep!")
                } else if ( distance < 0.5){
                    console.log("Beep!")
                } else {
                    console.log("")
                }
            }
        },
    }
}

const assemblyLineCar = assemblyLine();

const myCar = {

make: 'Toyota',

model: 'Avensis'

};

assemblyLineCar.hasClima(myCar);

console.log(myCar.temp);

myCar.tempSettings = 18;

myCar.adjustTemp();

console.log(myCar.temp);

assemblyLineCar.hasAudio(myCar);

myCar.currentTrack = {

name: 'Never Gonna Give You Up',

artist: 'Rick Astley'

};

myCar.nowPlaying();

assemblyLineCar.hasParktronic(myCar);

myCar.checkDistance(0.4);

myCar.checkDistance(0.2);

console.log(myCar);