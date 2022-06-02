function reportSystem(input) {
    let index = 0;
    let target = Number(input[index++]);
    let command = input[index++];
    let CC = 0;
    let cardpaid = 0;
    let CS = 0;
    let cashpaid = 0;
    let times = 1;

    while (command !== "End") {
        collect = Number(command);
        if (times % 2 !== 0) {
            if (collect > 100) {
                console.log("Error in transaction!");
            } else {
                console.log("Product sold!");
                CS += collect;
                cashpaid++;
            }
        } else {
            if (collect < 10) {
                console.log("Error in transaction!");
            } else {
                console.log("Product sold!");
                CC += collect;
                cardpaid++;
            }
        }
        let allMoney = CC + CS;
        if (allMoney >= target) {
            console.log(`Average CS: ${(CS / cashpaid).toFixed(2)}`);
            console.log(`Average CC: ${(CC / cardpaid).toFixed(2)}`);
            break;
        }
        times++;
        command = input[index++];
    }
    let allMoney = CC + CS;
    if (allMoney < target) {
        console.log("Failed to collect required money for charity.");
    }
}
reportSystem(["600", "86", "150", "98", "227", "End"]);
