function adAstra(input){

    let pattern = /([#|\|])(?<item>[\sA-Za-z]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<nutrition>\d+)\1/g;
    // Започва с # или | => Група item, която може да има празно пространство и безброй много букви => после има пак # или |, това с което е почнали
    // група Date, 2 цифри/2 цифри/2 цифри => после пак има # или | => група nutrition, която има безброй цифри => после пак има # или |
    let match = pattern.exec(input);                         // Взимаме съвпадението 
    let totalCalories = 0;                                   // Правим брояч за всички събрани калории от продуктите 
    let output = [];                                        // правим масив за отпечатването накрая 

    while (match !== null){                                 // Докато има съвпадения от патърна с инпута 
        output.push(`Item: ${match.groups.item}, Best before: ${match.groups.date}, Nutrition: ${Number(match.groups.nutrition)}`);
        // Към масива с информацията, прибавяме трите нужни елемента 
        totalCalories += Number(match.groups.nutrition);    // Прибавяме калориите от продукта към общите калории 
        match = pattern.exec(input);                        // Подменяме съвпадението с ново 
    }

    console.log(`You have food to last you for: ${Math.floor(totalCalories/2000)} days!`);
    // Делим общия брой калории на тези за ден 2000 и закръгляме към по-малкото число за цели дни 
    console.log(output.join("\n"));                         // Печатаме събрана информация за продуктите всеки на нов ред 
}
// adAstra(['#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|'])
adAstra([ '$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#IceCream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|' ])
// adAstra(['Hello|#Invalid food#19/03/20#450|$5*(@' ])