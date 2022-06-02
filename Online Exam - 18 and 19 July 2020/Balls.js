function balls(input) {
    let index = 0;
    let numberBalls = Number(input[index++]);
    let totalpoints = 0;
    let redBalls = 0;
    let orangeBalls = 0;
    let yellowBalls = 0;
    let whiteBalls = 0;
    let otherColorBalls = 0;
    let blackBalls = 0;
    for (let i = 0; i < numberBalls; i++) {
        let color = input[index++];
        switch (color) {
            case "red":redBalls++;totalpoints += 5;break;
            case "orange":orangeBalls++;totalpoints += 10;break;
            case "yellow":yellowBalls++;totalpoints += 15;break;
            case "white":whiteBalls++;totalpoints += 20;break;
            case "black":blackBalls++;totalpoints = Math.floor(totalpoints / 2);break;
            default:otherColorBalls++;break;
        }
    }
    console.log(`Total points: ${totalpoints}`);
    console.log(`Red balls: ${redBalls}`);
    console.log(`Orange balls: ${orangeBalls}`);
    console.log(`Yellow balls: ${yellowBalls}`);
    console.log(`White balls: ${whiteBalls}`);
    console.log(`Other colors picked: ${otherColorBalls}`);
    console.log(`Divides from black balls: ${blackBalls}`);
}
balls(["5", "red", "red", "ddd", "ddd", "ddd"]);
