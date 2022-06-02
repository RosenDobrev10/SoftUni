function skeleton(input) {
    let minutesControl = Number(input[0]);
    let secondsControl = Number(input[1]);
    let distance = Number(input[2]);
    let secondsFor100Meters = Number(input[3]);
    let timeControl = minutesControl * 60 + secondsControl;
    let time = (distance / 100) * secondsFor100Meters; // Чисто време без забавяне или забързване
    let finalTime = time - (distance / 120) * 2.5; // (distance / 120) * 2.5 = Колко пъти ще се забърза с по 2.5 секунди 
    if (finalTime <= timeControl) {
        console.log("Marin Bangiev won an Olympic quota!");
        console.log(`His time is ${finalTime.toFixed(3)}.`);
    } else {
        console.log(`No, Marin failed! He was ${(finalTime - timeControl).toFixed(3)} second slower.`);
    }
}
skeleton(["1", "20", "1546", "12"]);
