function piccolo(input){

    let parkingLot = {}     // Създаваме обект, в който ще слагаме номерата на колите 

    for (let element of input) {                            // Минаваме по инпута
        let [command,carNumber] = element.split(", ")       // Правим променлива с командата и номера на колата 
        command === "IN" ? parkingLot[carNumber] = null : delete parkingLot[carNumber]
        // Ако командата е IN запазваме такова пропърти с нулева стойност, ако не е трием пропъртито и неговата стойност
    }

    let sorted = Object.keys(parkingLot).sort((a, b) => a.localeCompare(b))
    // Обекта става на масив и сортираме по ключовете по буквите с localeCompare
    sorted.length === 0 ? console.log("Parking Lot is Empty") : sorted.map(car => console.log(car))
    // Ако дължината на масива с ключове е 0, печатаме празен паркинг, иначе минаваме по масива и печатаме всяка кола 
}
piccolo([
'IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU'])

piccolo([
'IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA'])