function numbers(numbers){

    let sequence = numbers.split(" ").map(Number).sort((a,b)=> b-a) // Взимаме поредицата от числа, делим я по интервали, правим ги на числа и ги сортираме в низходящ ред 

    let average = 0     // правим брояч за средното им аритметично 
    let sum = 0         // Правим променлива да трупаме сумата от числата в поредицата 

    for (let nums of sequence){         // Правим цикъл да обходим числата в поредицата 
        sum += nums                     // събираме тяхната сума 
        average = sum / sequence.length // Намираме средното им аритметично 
    }
    
    let aboveAverage = []               // Правим празен масив, в който ще трупаме търсените стойности 

    for (let i = 0; i < sequence.length; i++){  // Обхождаме всички стойности в поредицата 
        if (sequence[i] > average && aboveAverage.length < 5){  // Ако даденото число е по-голямо от средното аритметично и не сме добавили вече 5 числа 
            aboveAverage.push(sequence[i])  // го слагаме в масива с търсените стойности 
        }
    }
    if (aboveAverage.length > 0){           // Ако в масива, сме добавили някакви числа 
    console.log(aboveAverage.join(" "))     // ги печатаме с интервал 
    } else {                                // Ако в масива, няма добавени числа 
        console.log("No")                   // печатаме No 
    }
}
//numbers('10 20 30 40 50')
//numbers('5 2 3 4 -10 30 40 50 20 50 60 60 51')
//numbers('1')
numbers('-1 -2 -3 -4 -5 -6')