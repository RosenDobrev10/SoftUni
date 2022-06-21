function towns(input) {

    let listOfTowns = {};   // Правим празен обект, в който ще запазваме напите ключове с техните стойности 

    for (let element of input) {    // Минаваме и взимаме всеки елемент от инпута
        let townInfo = element.split(" | ");    // Взимаме от дадения елемент, неговите стойности в масив като го сплитнем по |
        listOfTowns.name = townInfo[0];         // В празния обект добавяме името на града, като го взимаме от масива за дадения град на нулев индекс 
        listOfTowns.latitude = Number(townInfo[1]).toFixed(2);
        listOfTowns.longitude = Number(townInfo[2]).toFixed(2);
        console.log(listOfTowns);               // Печатаме обектите, които сме събрали в списъка с градове 
    }
}
towns(["Sofia | 42.696552 | 23.32601", "Beijing | 39.913818 | 116.363625"]);

//towns(['Plovdiv | 136.45 | 812.575'])
