function movies(input){

    let listOfMovies = []   	// Правим празен масив, в който ще запазваме нашите обекти, които създаваме 

    for (let lines of input) {                  // Минаваме по всички елементи на нашият масив 
        if (lines.includes("addMovie")){        // Ако някъде в нашият елемент има стринг "addMovie"
            let movieName = lines.split("addMovie ")[1] // след като го разделим по стринга и интервал, на първи индекс стои името на филма 
            listOfMovies.push( {name: movieName} )  // в масива добавяме обект с property name и стойност името на филма 
        }
        else if (lines.includes("directedBy")){     // Ако някъде в нашият елемент има стринг "directedBy"
            let info = lines.split(" directedBy ")  // Взимаме информацията от този елемент като разделяме по directedBy като задължително има интервал преди и след израза 
            let name = info[0]                      // на нулев индекс стои името на филма 
            let director = info[1]                   // на първи индекс е името на режисьора    
            let movie = listOfMovies.find((element) => element.name === name )  // Търсим филм из масива, който има пропърти стойност, която да е равна на филма от елемента 
            if (movie){                     // Ако намерим такав филм
                movie.director = director   // към този филм добавяме и пропърти режисьор със стойност режисьора от елемента 
            }
        } else if (lines.includes("onDate")){   // Ако някъде в нашият елемент има стринг "onDate"
            let info = lines.split(" onDate ")  // Взимаме информацията от този елемент като разделяме по onDate като задължително има интервал преди и след израза 
            let name = info[0]                  // на нулев индекс стои името на филма
            let date = info[1]                  // на първи индекс е датата на филма 
            let movie = listOfMovies.find((element) => element.name === name )  // Търсим филм из масива, който има пропърти стойност, която да е равна на филма от елемента 
            if (movie){                         // Ако намерим такав филм
                movie.date = date               // към този филм добавяме и пропърти дата със стойност датата от елемента 
            }
        }
    }

    for (let movie of listOfMovies) {   // Преминаваме с цикъл през всички филми като обекти от масива с филми 
        if (movie.name && movie.director && movie.date){    // Ако филма има и трите пропъртита 
            console.log(JSON.stringify(movie))              // Изпечатваме всеки филм под формата на JSON string 
        }
    }
}
movies([
'addMovie Fast and Furious',    
'addMovie Godfather',   
'Inception directedBy Christopher Nolan',   
'Godfather directedBy Francis Ford Coppola',   
'Godfather onDate 29.07.2018',    
'Fast and Furious onDate 30.07.2018',  
'Batman onDate 01.08.2018',    
'Fast and Furious directedBy Rob Cohen'
])

// movies([
// 'addMovie The Avengers',
// 'addMovie Superman',
// 'The Avengers directedBy Anthony Russo',
// 'The Avengers onDate 30.07.2010',
// 'Captain America onDate 30.07.2010',
// 'Captain America directedBy Joe Russo' 
// ])