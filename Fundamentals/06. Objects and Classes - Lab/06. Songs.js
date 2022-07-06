function songs(input){
    class Song{                             // Създаваме си клас Song 
        constructor(type, name, time) {     // Правим си конструктор с дадените параметри 
            this.type = type                // Създаваме свойства
            this.name = name                // Създаваме свойства
            this.time = time                // Създаваме свойства
        }
    }

    let songs = []                              // Правим празен масив, в който ще слагаме песните 
    let numberOfSongs = Number(input.shift())   // Първия елемент от масива е броя на песните 
    let typeSong = input.pop()                  // последните елемент е типа на песните, които трябва да се изпечатат

    for (let i = 0; i < numberOfSongs; i++){            // Минаваме по броя песни от масива 
        let [ type, name, time ] = input[i].split("_")  // Създаваме си променливи като взимаме от инпута, разделени по долна черта
        let song = new Song(type, name, time)           // Създаваме всяка песен от класа ни като подаваме взетите от инпута тип, име и време 
        songs.push(song)                                // всяка създадена песен я слагаме в масива с песни 
    }

    if (typeSong === "all"){                            // Ако типа е all 
        songs.map( (i) => console.log(i.name))          // Прилагаме на всяка песен от масива функцията да се изпечата името 
    } else {                                            // Ако типа НЕ е all
        let filtered = songs.filter((i) => i.type === typeSong) // Филтрираме песните по техния тип изваден от инпута 
        filtered.map( (i) => console.log(i.name))               // Минаваме по филтрираните песни и ги разпечатваме 
    }
}
// songs([3,

//     'favourite_DownTown_3:14',
    
//     'favourite_Kiss_4:16',
    
//     'favourite_Smooth Criminal_4:01',
    
//     'favourite'])
// songs([4,

//     'favourite_DownTown_3:14',
    
//     'listenLater_Andalouse_3:24',
    
//     'favourite_In To The Night_3:58',
    
//     'favourite_Live It Up_3:48',
    
//     'listenLater'])
songs([2, 'like_Replay_3:15', 'ban_Photoshop_3:48', 'all'])