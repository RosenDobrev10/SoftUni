function movies(arr) {
    const movies = {}
    for (let line of arr) {
        if (line.includes('addMovie')) {
            let movie = line.split("addMovie ")[1]
            movies[movie] = {}
            movies[movie].name = movie
        } else if (line.includes('directedBy')) {
            let [movie, director] = line.split(' directedBy ')
            if (movies[movie] !== undefined) {
                movies[movie].director = director
            }
        } else if (line.includes('onDate')) {
            let [movie, date] = line.split(' onDate ')
            if (movies[movie] !== undefined) {
                movies[movie].date = date
            }
        }
    }
    for (let movie of Object.keys(movies)) {
        if (movies[movie].name !== undefined && movies[movie].director !== undefined && movies[movie].date !== undefined) {
            console.log(JSON.stringify(movies[movie]))
        }
    }
}
