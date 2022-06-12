function tennisRanklist(input) {
    index = 0;
    let tournaments = Number(input[index]);
    index++;
    let startPoints = Number(input[index]);
    index++;
    let pointsFromTournaments = 0;
    let countWinner = 0;
  
    for (i = 0; i < tournaments; i++) {
      let stage = input[index];
      index++;
      if (stage === "W") {
        pointsFromTournaments += 2000;
        countWinner++;
      } else if (stage === "F") {
        pointsFromTournaments += 1200;
      } else if (stage === "SF") {
        pointsFromTournaments += 720;
      }
    }
    let finalPoints = startPoints + pointsFromTournaments;
    let averagePoints = pointsFromTournaments / tournaments;
    let averageWins = (countWinner / tournaments) * 100;
  
    console.log(`Final points: ${finalPoints}`);
    console.log(`Average points: ${Math.floor(averagePoints)}`);
    console.log(`${averageWins.toFixed(2)}%`);
  }
  tennisRanklist(["7", "1200", "SF", "F", "W", "F", "W", "SF", "W"]);