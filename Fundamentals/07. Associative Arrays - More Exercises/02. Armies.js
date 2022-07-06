function armies(input) {
    let armies = {};
    let armyLeaders = [];
 
    for (let line of input) {
        if (line.includes('arrives')) {
            let indexOfArrives = line.indexOf('arrives');
            let leader = line.slice(0, indexOfArrives).trim();
            if (!armies.hasOwnProperty(leader)) {
                armies[leader] = {
                    armiesName: {},
                    totalArmyCount: 0
                };
            }
            armyLeaders.push(leader);
        } else if (line.includes('defeated')) {
            let indexOfDefeated = line.indexOf('defeated');
            let leader = line.slice(0, indexOfDefeated).trim();
            let indexOfLeader = armyLeaders.indexOf(leader);
            if (armies.hasOwnProperty(leader)) {
                delete armies[leader];
                armyLeaders.splice(indexOfLeader, 1);
            }
        } else if (line.includes(':')) {
            let [leader, army] = line.split(': ');
            let [armyName, armyCount] = army.split(', ');
            if (armies.hasOwnProperty(leader)) {
                if (!armies[leader].armiesName.hasOwnProperty(armyName)) {
                    armies[leader].armiesName[armyName] = Number(armyCount);
                    armies[leader].totalArmyCount += Number(armyCount);
                }
            }
        } else if (line.includes('+')) {
            let [armyName, armyCount] = line.split(' + ');
            armyLeaders.forEach(leader => {

                for (let army in armies[leader]) {
                    if (armies[leader][army].hasOwnProperty(armyName)) {
                        armies[leader].armiesName[armyName] += Number(
                            armyCount
                        );
                        armies[leader].totalArmyCount += Number(armyCount);
                    }
                }

            });
        }
    }

    Object.entries(armies).sort((a, b) => b[1].totalArmyCount - a[1].totalArmyCount)
    .forEach(army => {console.log(`${army[0]}: ${army[1].totalArmyCount}`);
            Object.entries(army[1].armiesName).sort((a, b) => b[1] - a[1])
            .forEach(armyName => {console.log(`>>> ${armyName[0]} - ${armyName[1]}`)});
        });
}
armies([
'Rick Burr arrives',
'Fergus: Wexamp, 30245', 
'Rick Burr: Juard, 50000', 
'Findlay arrives', 
'Findlay: Britox, 34540', 
'Wexamp + 6000',
'Juard + 1350', 
'Britox + 4500',
'Porter arrives', 
'Porter: Legion, 55000', 
'Legion + 302', 
'Rick Burr defeated', 
'Porter: Retix, 3205'])