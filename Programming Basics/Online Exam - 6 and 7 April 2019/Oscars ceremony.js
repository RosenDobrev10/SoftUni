function oscarsCeremony(input) {
    let rent = Number(input[0]);
    let statuette = rent - rent * 0.3;
    let catering = statuette - statuette * 0.15;
    let dubbing = catering * 0.5; // dubbing = Озвучаване
    let allCost = dubbing + catering + statuette + rent;
    console.log(allCost.toFixed(2));
}
oscarsCeremony(["3500"]);
