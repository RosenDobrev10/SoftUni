function inventory(input){

    let listOfHeroes = []   // Правим си масив, в който ще събираме нашите герои 

    for (let elements of input) {               // Минаваме по масива като взимаме всеки елемент 
        let info = elements.split(" / ")        // Взимаме информацията за всеки герои като делим елемента по интервал / интервал 
        let currentHeroName = info[0]           // На нулев индекс имаме името на текущия герой 
        let currentLevel = Number(info[1])      // На първи индекс имаме нивото на текущия герой
        let currentItems = info[2]              // На втори индекс имаме предметите на текущия герой
        let heroeObject = { name:currentHeroName, level:currentLevel, items:currentItems}   // Създаваме обект с взетите данни 
        listOfHeroes.push(heroeObject)          // Така създадения обект го добавяме в масива с герои 
    }

    listOfHeroes.sort((a, b) => a.level - b.level)  // Сортираме получения масив по нивото на всеки герой 

    for (let hero of listOfHeroes) {            // Минаваме по всеки герой от масива с герои 
        console.log(`Hero: ${hero.name}`)       // Печатаме името на героя 
        console.log(`level => ${hero.level}`)   // Печатаме нивото на героя 
        console.log(`items => ${hero.items}`)   // печатаме предметите на героя 
    }
 
}
inventory([
'Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara'
])

// inventory([
// 'Batman / 2 / Banana, Gun',
// 'Superman / 18 / Sword',
// 'Poppy / 28 / Sentinel, Antara'
// ])