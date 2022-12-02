function heroesOfCodeAndLogicVII(input) {
    const heroes = {};
    const numberOfHeroes = Number(input.shift());
    for (let i = 0; i < numberOfHeroes; i++) {
        const [name, hp, mp] = input.shift().split(" ");
        heroes[name] = { hp: Number(hp), mp: Number(mp) };
    }
    while (input[0] !== "End") {
        const [command, name, param1, param2] = input.shift().split(" - ");
        if (command === "CastSpell") {
            if (heroes[name].mp >= Number(param1)) {
                heroes[name].mp -= Number(param1);
                console.log(`${name} has successfully cast ${param2} and now has ${heroes[name].mp} MP!`);
            } else {
                console.log(`${name} does not have enough MP to cast ${param2}!`);
            }
        } else if (command === "TakeDamage") {
            if (heroes[name].hp - Number(param1) > 0) {
                heroes[name].hp -= Number(param1);
                console.log(`${name} was hit for ${param1} HP by ${param2} and now has ${heroes[name].hp} HP left!`);
            } else {
                delete heroes[name];
                console.log(`${name} has been killed by ${param2}!`);
            }
        } else if (command === "Recharge") {
            const currentMP = heroes[name].mp;
            heroes[name].mp + Number(param1) > 200 ? heroes[name].mp = 200 : heroes[name].mp += Number(param1);
            console.log(`${name} recharged for ${heroes[name].mp - currentMP} MP!`);
        } else if (command === "Heal") {
            const currentHP = heroes[name].hp;
            heroes[name].hp + Number(param1) > 100 ? heroes[name].hp = 100 : heroes[name].hp += Number(param1);
            console.log(`${name} healed for ${heroes[name].hp - currentHP} HP!`);
        }
    }
    for (const hero in heroes) {
        console.log(hero);
        console.log(`  HP: ${heroes[hero].hp}`);
        console.log(`  MP: ${heroes[hero].mp}`);
    }
}
