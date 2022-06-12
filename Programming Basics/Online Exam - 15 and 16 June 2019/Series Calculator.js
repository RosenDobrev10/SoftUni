function seriesCalculator(input) {
    let nameSerial = input[0];
    let seasons = Number(input[1]);
    let episodes = Number(input[2]);
    let timeEpisode = Number(input[3]);

    let time = seasons * episodes * (timeEpisode * 1.2) + seasons * 10;

    console.log(
        `Total time needed to watch the ${nameSerial} series is ${Math.floor(time )} minutes.`);
}
seriesCalculator(["Lucifer", "3", "18", "55"]);
