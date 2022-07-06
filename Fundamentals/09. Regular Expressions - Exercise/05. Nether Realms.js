function netherRealms(input) {

    let splitPattern = /[, ]+/g;
    let demonsArr = input[0].split(splitPattern);
    let demons = {};
    let healthPattern = /[^0-9.\/+*-]/g;
    let sumPattern = /[+-]?\d+\.?\d*/g;
    let dmgPattern = /\*|\//g;
 
    for (let demon of demonsArr) {
        let health = 0;
        let damage = 0;
        if (demon.match(healthPattern) != null) {

            for (let char of demon.match(healthPattern)) {
                health += char.charCodeAt();
            }
        }
 
        let digits = demon.match(sumPattern);
 
        if (digits != null) {
            for (let digit of digits) {
                damage += Number(digit);
            }
        }
 
        let subtractOrMultiply = demon.match(dmgPattern);
 
        if (subtractOrMultiply != null) {
            for (let operand of subtractOrMultiply) {
                if (operand == '*') {
                    damage *= 2;
                } else {
                    damage /= 2;
                }
            }
        }
 
        demons[demon] = {};
        demons[demon]['health'] = health;
        demons[demon]['damage'] = damage;
    }
 
    let sorted = Object.entries(demons).sort((a, b) => a[0].localeCompare(b[0]));

    for (let [name, valuesObj] of sorted) {
        console.log(`${name} - ${valuesObj['health']} health, ${valuesObj['damage'].toFixed(2)} damage`);
    }
}
netherRealms(['M3ph-0.5s-0.5t0.0**'])
netherRealms(['M3ph1st0**, Azazel'])
netherRealms(['Gos/ho'])