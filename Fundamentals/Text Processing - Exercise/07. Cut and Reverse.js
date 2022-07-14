function cutAndReverse(string) {

    let middle = string.length / 2;                 // Намираме къде е средата на стринга

    let firstHalf = string.substring(0, middle);    // Първата половина е от началото до средата 
    let secondHalf = string.substring(middle);      // Втората половина е от средата до края 

    console.log(firstHalf.split("").reverse().join("")); // Разделяме ги на масив, обръщаме ги и ги съединяваме пак в стринг 
    console.log(secondHalf.split("").reverse().join(""));   // Разделяме ги на масив, обръщаме ги и ги съединяваме пак в стринг

}
cutAndReverse('tluciffiDsIsihTgnizamAoSsIsihT')