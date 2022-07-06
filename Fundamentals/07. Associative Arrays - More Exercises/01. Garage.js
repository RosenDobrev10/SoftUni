function garage(input) {

    let garages = {};
 
    for (let line of input) {
        let [garage, carInfo] = line.split(' - ');
 
        if (!garages.hasOwnProperty(garage)) {
            garages[garage] = [];
        }
        garages[garage].push(carInfo);
    }
 
    let output = '';
     Object.entries(garages)
        .forEach(([garage, cars]) => {
            output += `Garage № ${garage}\n`;
 
            for (let currCar of cars) {
                while (currCar.includes(': ')) {
                    currCar = currCar.replace(': ', ' - ');
                }
 
                output += `--- ${currCar}\n`;
            }
        });
    console.log(output);
 
}
garage(['1 - color: blue, fuel type: diesel', '1 - color: red, manufacture: Audi', '2 - fuel type: petrol', '4 - color: dark blue, fuel type: diesel, manufacture: Fiat'])