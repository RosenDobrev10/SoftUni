function arrayModifier(arr) {
    let numbers = arr.shift().split(" ").map(Number);
    while (arr[0] !== "end") {
        let [command, index1, index2] = arr.shift().split(" ");
        index1 = Number(index1);
        index2 = Number(index2);
        if (command === "swap") {
            [numbers[index1], numbers[index2]] = [numbers[index2], numbers[index1]];
        } else if (command === "multiply") {
            numbers[index1] *= numbers[index2];
        } else if (command === "decrease") {
            numbers = numbers.map((x) => x - 1);
        }
    }
    console.log(numbers.join(", "));
}
