function mirrorWords(input) {

    let pattern = /(#|@)(?<first>[A-Za-z]{3,})\1\1(?<second>[A-Za-z]{3,})\1/g;
    // Може да започва с # или @ -> Имаме група с име first, в която трябва да има букви само от 3 до безкрай -> След това с backreference
    // Повтаряме 2 пъти първото срещане от групата ни за # или @ -> Имаме група с име second, която трябва да има букви от 3 до безкрай ->
    // Пак с backreference посочваме, че трябва да има # или @
    let match = pattern.exec(input);            // Взимаме съвпадението 
    let count = 0;                              // Правим брояч за валидните съвпадения 
    let validPairs = [];                        // В масив, ще пазим валидните двойки 

    while (match !== null) {                    // Докато има съвпадения, ще въртим цикъла 
        count++;                                // На всяко съвпадение, ще увеличаваме брояча с едно 
        let firstWord = match.groups.first;     // Правим променлива с първата дума 
        let secondWord = match.groups.second;   // Правим променлива с втората дума 
        let reversed = secondWord.split("").reverse().join(""); // Обръщаме втората дума, за да я сравним с първата 
        if (firstWord === reversed) {           // Ако са еднакви 
            validPairs.push(`${firstWord} <=> ${secondWord}`);  // ги добавяме в масива по описания начин 
        }
        match = pattern.exec(input);            // Подменяме съвпадението с ново 
    }

    if (count === 0) {                              // Ако НЯМА двойки въобще 
        console.log("No word pairs found!");        // Печатаме това 
    } else {                                        // Ако ИМА двойки 
        console.log(`${count} word pairs found!`);  // Печатаме колко сме намерили 
    }

    if (validPairs.length === 0) {                  // Ако в масива НЯМАМЕ валидни двойки 
        console.log("No mirror words!");            // Печатаме, че няма огледални двойки 
    } else {                                        // Ако в масива ИМАМЕ валидни двойки
        console.log("The mirror words are:");       // Печатаме съобщение 
        console.log(validPairs.join(", "));         // Печатаме валидните двойки разделени със запетая и интервал 
    }
}
mirrorWords(["@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r",]);
mirrorWords(["#po0l##l0op# @bAc##cAB@ @LM@ML@ #xxxXxx##xxxXxx# @aba@@ababa@"]);
mirrorWords(["#lol#lol# @#God@@doG@# #abC@@Cba# @Xyu@#uyX#"]);
