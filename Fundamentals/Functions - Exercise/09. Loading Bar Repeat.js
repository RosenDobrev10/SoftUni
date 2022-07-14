function loadingBar(number) {

    let percentages = '%'.repeat(number / 10); // repeat = Колко пъти ще се повтори даден символ или израз 
    let dots = '.'.repeat(10 - number / 10);

    if (number === 100) {
        console.log(`${number}% Complete!`);
        console.log(`[${percentages}]`);
    } else {
        console.log(`${number}% [${percentages}${dots}]`);
        console.log(`Still loading...`);
    }
}
// loadingBar(30)
loadingBar(50)
//loadingBar(100)