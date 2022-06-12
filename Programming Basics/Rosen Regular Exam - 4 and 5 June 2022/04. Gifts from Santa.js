function giftsFromSanta(input) {
    let N = Number(input[0]);
    let M = Number(input[1]);
    let S = Number(input[2]);
    let output = "";

    for (let i = M; i >= N; i--) {
        if (i % 2 === 0 && i % 3 === 0) {
            if (i === S) {
                break;
            } else {
                output += i + " ";
            }
        }
    }
    console.log(output);
}
giftsFromSanta(["1", "30", "15"]);
giftsFromSanta(["1", "36", "12"]);
giftsFromSanta(["20", "1000", "36"]);
