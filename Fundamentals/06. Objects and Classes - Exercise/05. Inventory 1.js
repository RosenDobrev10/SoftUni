function inventory(arr) {
    const heroes = [];
    for (let line of arr) {
        const [name, level, items] = line.split(" / ");
        heroes.push( { name:name, level:Number(level), items:items } );
    }
    heroes.sort((a, b) => a.level - b.level);
    for (let hero of heroes) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    }
}
