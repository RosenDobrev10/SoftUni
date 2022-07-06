function cats(catsAsString){    // Получаваме Котките като масив от стрингове 

    class cat{                      // Правим си клас cat 
        constructor(name, age) {   // Задължително се ползва думата constructor и подаваме параметрите за създаване на нова котка 
            this.name = name        // с this.name Създаваме property име на котката 
            this.age = age          // с this.age Създаваме property годините на котката
        }

        meow(){                                                      // Създаваме фукнция meow
            console.log(`${this.name}, age ${this.age} says Meow`)   // която ще ползва следните пропъртита и ще изпечатва 
        }
    }

    let catsArray = []                  // Създаваме си масив, в който ще слагаме нашите котки 

    for (let singleCat of catsAsString){        // Минаваме с цикъл, за да създадем нашите котки 
        let token = singleCat.split(" ")        // Минаваме по всяка една котка и делим по интервал да получим името и годините 
        let cats = new cat(token[0], Number(token[1])); // Създаваме котки, като ползваме класа cat и подаваме за всяка котка, име и години 
        catsArray.push(cats)                            // Новосъздадените котки от класа ги добавяме в нашият масив 
    }

    for (let cat of catsArray){         // Правим цикъл да обиколим котките от създадения масив 
        cat.meow()                      // Извикваме тяхната функция да мяукат за всяка котка 
    }
}
cats(['Mellow 2', 'Tom 5'])
//cats(['Candy 1', 'Poppy 3', 'Nyx 2'])