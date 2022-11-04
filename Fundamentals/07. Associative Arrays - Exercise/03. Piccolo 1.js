function piccolo(input) {
    let parkingLot = {};
    input.forEach(line => {
        let [direction, carNumber] = line.split(", ");
        direction === "IN" ? parkingLot[carNumber] = carNumber : delete parkingLot[carNumber];
    })
    let sorted = Object.keys(parkingLot).sort((a, b) => a.localeCompare(b));
    sorted.length === 0 ? console.log("Parking Lot is Empty") : sorted.forEach(car => console.log(car));
}
