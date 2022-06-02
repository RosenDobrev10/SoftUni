function serial(input) {
    let index = 0;
    let movies = Number(input[index++]);
    let rating = 0;
    let bestMovie = "";
    let worstMovie = "";
    let bestRating = 0;
    let worstRating = 11;

    for (let i = 0; i < movies; i++) {
        let currentMovie = input[index++];
        let currentRating = Number(input[index++]);
        if (currentRating > bestRating) {
            bestRating = currentRating;
            bestMovie = currentMovie;
        }
        if (currentRating < worstRating) {
            worstRating = currentRating;
            worstMovie = currentMovie;
        }
        rating += currentRating;
    }
    let averageRating = rating / movies;
    console.log(`${bestMovie} is with highest rating: ${bestRating.toFixed(1)}`);
    console.log(`${worstMovie} is with lowest rating: ${worstRating.toFixed(1)}`);
    console.log(`Average rating: ${averageRating.toFixed(1)}`);
}
serial(["5","A Star is Born","7.8","Creed 2","7.3","Mary Poppins","7.2","Vice","7.2","Captain Marvel","7.1",]);
