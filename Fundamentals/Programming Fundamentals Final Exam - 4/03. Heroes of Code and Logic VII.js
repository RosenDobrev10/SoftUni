function heroesOfCodeAndLogicVII(input) {

    let n = Number(input.shift());                  // Вадим си броя на героите от първия елемент от масива 

    let heroes = {};                                // Създаваме си празен обект с героите

    for (let i = 0; i < n; i++) {                   // Минаваме толкова пъти, колкото са героите 
        let heroData = input.shift().split(" ");    // Взимаме данните за героя 
        let name = heroData[0];                     // На нулев индекс е името му
        let hp = Number(heroData[1]);               // на първи индекс е кръвта
        let mp = Number(heroData[2]);               // на втори индекс е маната 
        heroes[name] = { hp, mp };                  // към обекта герои прибавяме като свойство името на героя, а на героя добавяме свойства, кръв и мана 
    }

    while (input[0] !== "End") {                    // Минаваме по инпута докато получим End 
        let line = input.shift().split(" - ");      // линията е вадим и делим по интервал, тире, интервал 
        let command = line[0];                      // Командата е на нулев индекс 
        let hero = line[1];                         // Името на героя е на първи индекс 

        if (command === "CastSpell") {              // Ако командата е CastSpell
            let mpNeeded = Number(line[2]);         // Нужната мана за магията е на индекс 2
            let magic = line[3];                    // името на магията е на индекс 3 
            if (heroes[hero].mp >= mpNeeded) {      // Ако маната на героя е повече или равна на нужната 
                heroes[hero].mp -= mpNeeded;        // от маната на героя вадим нужната 
                console.log(`${hero} has successfully cast ${magic} and now has ${heroes[hero].mp} MP!`);
            } else {                                // Ако маната на героя е недостатъчна 
                console.log(`${hero} does not have enough MP to cast ${magic}!`);
            }

        } else if (command === "TakeDamage") {      // Ако командата е TakeDamage
            let damage = Number(line[2]);           // Понесения удар е на индекс 2
            let attacker = line[3];                 // името на атакуващия е на индекс 3
            heroes[hero].hp -= damage;              // от кръвта на героя, вадим атаката 
            if (heroes[hero].hp > 0) {              // Ако кръвта му е повече от 0 е жив 
                console.log(`${hero} was hit for ${damage} HP by ${attacker} and now has ${heroes[hero].hp} HP left!`);
            } else {                                // Ако кръвта 0 или по-малко е умрял 
                console.log(`${hero} has been killed by ${attacker}!`);
                delete heroes[hero];                // Трием го от обекта с героите 
            }

        } else if (command === "Recharge") {        // Ако командата е Recharge
            let currentMP = heroes[hero].mp;        // Взимаме маната му до момента 
            let mpTaken = Number(line[2]);          // Маната, която получава е на индекс 2
            if (heroes[hero].mp + mpTaken <= 200) { // Ако маната на героя + взетата мана е по-малко или равна на 200 
                heroes[hero].mp += mpTaken;         // Към маната на героя добавяме, взетата мана 
                console.log(`${hero} recharged for ${mpTaken} MP!`);    // Печатаме, колкото мана е взел
            } else {                                // Ако маната на героя + взетата мана стане повече от 200
                heroes[hero].mp = 200;              // Маната на героя, става максималната възможна 200 
                console.log(`${hero} recharged for ${200 - currentMP} MP!`);    // Печатаме разликата от 200 и първоначалната мана 
            }

        } else if (command === "Heal") {            // Ако командата е Heal
            let currentHP = heroes[hero].hp;        // Взимаме кръвта му до момента    
            let hpTaken = Number(line[2]);          // Кръвта, която получава е на индекс 2     
            if (heroes[hero].hp + hpTaken <= 100) { // Ако кръвта на героя + взетата кръв е по-малко или равна на 100
                heroes[hero].hp += hpTaken;         // Към кръвта на героя добавяме, взетата кръв
                console.log(`${hero} healed for ${hpTaken} HP!`);       // Печатаме, колкото кръв е взел
            } else {                                // Ако кръвта на героя + взетата кръв стане повече от 100
                heroes[hero].hp = 100;              // Кръста на героя, става максималната възможна 100
                console.log(`${hero} healed for ${100 - currentHP} HP!`);   // Печатаме разликата от 100 и първоначалната кръв
            }
        }
    }

    for (let hero in heroes) {                      // Минаваме по всеки герои от обекта ни с герои 
        console.log(hero);                          // Печатаме героя 
        console.log(`  HP: ${heroes[hero].hp}`);    // Печатаме кръвта на героя 
        console.log(`  MP: ${heroes[hero].mp}`);    // Печатаме маната на героя    
    }
}
// heroesOfCodeAndLogicVII([
// '4',
// 'Adela 90 150',
// 'SirMullich 70 40',
// 'Ivor 1 111',
// 'Tyris 94 61',
// 'Heal - SirMullich - 50',
// 'Recharge - Adela - 100',
// 'CastSpell - Tyris - 1000 - Fireball',
// 'TakeDamage - Tyris - 99 - Fireball',
// 'TakeDamage - Ivor - 3 - Mosquito',
// 'End'])

heroesOfCodeAndLogicVII([
    "2",
    "Solmyr 85 120",
    "Kyrre 99 50",
    "Heal - Solmyr - 10",
    "Recharge - Solmyr - 50",
    "TakeDamage - Kyrre - 66 - Orc",
    "CastSpell - Kyrre - 15 - ViewEarth",
    "End",
]);