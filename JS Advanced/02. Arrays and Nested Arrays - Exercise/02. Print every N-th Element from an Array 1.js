function printEveryNElementFromAnArray(array, step) {

     return array.filter((element, index) => index % step === 0);
     // Ако индекса на елемента се дели модулно на стъпката и остатъка е 0, значи е правилния индекс 
    
}
printEveryNElementFromAnArray(["5", "20", "31", "4", "20"], 2);
printEveryNElementFromAnArray(["dsa", "asd", "test", "tset"], 2);
printEveryNElementFromAnArray(["1", "2", "3", "4", "5"], 6);
