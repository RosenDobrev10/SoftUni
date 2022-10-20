function memoryGame(arr) {
    let sequence = arr.shift().split(" ");
    let moves = 0;
    while (arr[0] !== "end") {
        moves++;
        let [index1, index2] = arr.shift().split(" ").map(Number);
        if (index1 === index2 || sequence[index1] === undefined || sequence[index2] === undefined) {
            sequence.splice(sequence.length / 2, 0, `-${moves}a`, `-${moves}a`);
            console.log("Invalid input! Adding additional elements to the board");
        } else {
            if (sequence[index1] === sequence[index2]) {
                console.log(`Congrats! You have found matching elements - ${sequence[index1]}!`);
                sequence.splice(Math.max(index1, index2), 1);
                sequence.splice(Math.min(index1, index2), 1);
            } else {
                console.log("Try again!");
            }
        }
        if (sequence.length === 0) {
            return console.log(`You have won in ${moves} turns!`);
        }
    }
    console.log("Sorry you lose :(");
    console.log(sequence.join(" "));
}
