function printDNA(n){

    let arr = 'ATCGTTAGGG'.split('') // Правим масив с числата от комбинацията букви, за да можем да ги взимаме и добавяме

    for(let i = 1; i <= n; i++){    // Правим цикъл, който да печата докато стигнем дадената цифра 

        let a = arr.splice(0,1)     // Взимаме буквата на нулевия индекс и я махаме от масива 
        let b = arr.splice(0,1)     // Взимаме буквата на нулевия индекса от останалия масив 

        if(i % 4 === 1){                    // Комбинация 1
            console.log(`**${a}${b}**`);
        }
        else if(i % 4 === 2){               // Комбинация 2
            console.log(`*${a}--${b}*`);
        }
        else if(i % 4 === 3){               // Комбинация 3
            console.log(`${a}----${b}`);
        }
        else if(i % 4 === 0){               // Комбинация 2
            console.log(`*${a}--${b}*`);
        }
        arr.push(a)                      // Връщаме символите обратно в края на масива, за да го възстановим с 10 символа 
        arr.push(b)                      // Връщаме символите обратно в края на масива, за да го възстановим с 10 символа 
    }
}
printDNA(11)