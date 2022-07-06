function arenaTier(input) {

    let gladiators = {};
 
    for (let line of input) {
        if (line === 'Ave Cesar') {
            break;
        }
        let element = line.split(' ');
        if (element[1] === '->') {
            let [gladiator, technique, skillAmount] = line.split(' -> ');
            skillAmount = Number(skillAmount);
            if (!gladiators.hasOwnProperty(gladiator)) {
                gladiators[gladiator] = {};
            }
            if (!gladiators[gladiator].hasOwnProperty(technique) || gladiators[gladiator][technique] < skillAmount) {
                gladiators[gladiator][technique] = skillAmount;
            }
        } else if (element[1] === 'vs') {
            let [gladiator1, gladiator2] = line.split(' vs ');
            if (gladiators.hasOwnProperty(gladiator1) && gladiators.hasOwnProperty(gladiator2)) {
                let gladiator1Techniques = (gladiators[gladiator1]);
                let gladiator2Techniques = (gladiators[gladiator2]);

                for (let skill in gladiator1Techniques) {
 
                    if (gladiator2Techniques.hasOwnProperty(skill)) {
                        if (gladiator1Techniques[skill] > gladiator2Techniques[skill]) {
                            delete gladiators[gladiator2];
                        } else {
                            delete gladiators[gladiator1];
                        }
                    }
                }

            }
        }
    }

    for (let key in gladiators) {
        let sum = 0;
        let outsideObj = gladiators[key];

        for (let insideKey in outsideObj) {
            sum += outsideObj[insideKey];
        }

        outsideObj['sum'] = sum;
    }
 
    Object.entries(gladiators).sort((a, b) => b[1].sum - a[1].sum || a[0].localeCompare(b[0]))
    .forEach(gladiator => {console.log(`${gladiator[0]}: ${gladiator[1].sum} skill`);
            delete gladiator[1].sum;

    Object.entries(gladiator[1]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(gladiator => {console.log(` - ${gladiator[0]} <!> ${gladiator[1]}`);});
        });
}
arenaTier([ 
    'Peter -> Duck -> 400', 
    'Julius -> Shield -> 150', 
    'Gladius -> Heal -> 200', 
    'Gladius -> Support -> 250', 
    'Gladius -> Shield -> 250', 
    'Peter vs Gladius', 
    'Gladius vs Julius', 
    'Gladius vs Maximilian', 
    'Ave Cesar' ])