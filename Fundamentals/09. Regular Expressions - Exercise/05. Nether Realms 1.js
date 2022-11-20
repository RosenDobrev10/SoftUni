function netherRealms(input) {
    let demonsArr = input.split(/[, ]+/g);
    let demons = {};
    let healthPattern = /[^0-9.\/+*-]/g;
    let damagePattern = /[+-]?\d+\.?\d*/g;
    let operandsPattern = /\*|\//g;

    for (let demon of demonsArr) {
        let health = 0;
        let damage = 0;
        if (demon.match(healthPattern)) {
            demon.match(healthPattern).forEach(char => health += char.charCodeAt());
        }
        if (demon.match(damagePattern)) {
            demon.match(damagePattern).forEach(digit => damage += Number(digit));
        }
        if (demon.match(operandsPattern)) {
            for (let operand of demon.match(operandsPattern)) {
                operand === '*' ? damage *= 2 : damage /= 2;
            }
        }
        demons[demon] = {};
        demons[demon]['health'] = health;
        demons[demon]['damage'] = damage;
    }
    let sorted = Object.entries(demons).sort((a, b) => a[0].localeCompare(b[0]));
    for (let [name, valuesObj] of sorted) {
        console.log(`${name} - ${valuesObj.health} health, ${valuesObj.damage.toFixed(2)} damage`);
    }
}
