function searchForANumber(arrayOne, arrayTwo) {

    let numbersToTakeFromArrayOne = arrayTwo[0]; // Първото число от втория ни масив са колко числа трябва да вземем от първия 
    let numbersToDelete = arrayTwo[1];  // Второто число е колко трябва да премахнем от началото на вече взетия масив 
    let searchedNumber = arrayTwo[2];   // Третото число е това, за което търсим съвпадения в първия масив 

    let newArray = arrayOne.splice(0, numbersToTakeFromArrayOne); // Създаваме си нов масив с числата, които взимаме от първия 
    newArray = newArray.splice(0, numbersToDelete);    // Премахваме броя числа, които са ни указали 
    let count = 0;                                    // Създаваме брояч, колко пъти сме намерили числото в новия ни масив  

    for (let i = 0; i < newArray.length; i++) {     // Създаваме цикъл, за да търсим в масива ни 
        if (newArray[i] === searchedNumber) {       // Ако някое от числата в масива съвпада с търсеното от нас число 
            count++;                                // Увеличаваме броя на съвпаденията 
        }
    }
    console.log(`Number ${searchedNumber} occurs ${count} times.`);
}
searchForANumber([5, 2, 3, 4, 1, 6], [5, 2, 3]);
//searchForANumber([7, 1, 5, 8, 2, 7], [3, 1, 5])
