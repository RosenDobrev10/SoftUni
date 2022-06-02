function TrapeziodArea(input) {
    let ab = Number(input[0]);
    let cd = Number(input[1]);
    let ac = Number(input[2]);
    let Trapeziod = ((ab + cd) * ac) / 2;

    console.log(Trapeziod.toFixed(2));
}
TrapeziodArea(["8", "13", "7"]);
