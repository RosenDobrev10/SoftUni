function TrainingLab(input) {
    let lenght = Number(input[0]) * 100;
    let width = Number(input[1]) * 100;

    let widthMinusKoridor = width - 100;
    let seatWidth = Math.floor(widthMinusKoridor / 70);
    let seatLenght = Math.floor(lenght / 120);
    let availableSeats = seatLenght * seatWidth - 3;
    console.log(availableSeats);
}
TrainingLab(["15", "8.9"]);
