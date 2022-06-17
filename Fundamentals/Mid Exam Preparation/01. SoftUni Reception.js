function softUniReception(array){
    let firstEmployee = Number(array.shift())   // Взимаме първия служител с неговите въпроси на час 
    let secondEmployee = Number(array.shift())  // Взимаме втория служител с неговите въпроси на час 
    let thirdEmployee = Number(array.shift())   // Взимаме третия служител с неговите въпроси на час 
    let questions = Number(array.shift())              // Взимаме общия брой зададени въпроси от студентите

    let answeredQuestionsInHour = firstEmployee + secondEmployee + thirdEmployee // Изчисляваме общия брой въпроси от служителите 
    let time = 0

    for (let i = 1; i <= questions; i+= answeredQuestionsInHour){   // Въртим цикъл, докато се отговори на всички въпроси 
        time ++                             // Увеличаваме часовете с един на всяко влизане в цикъла 
        if ( time % 4 === 0){               // На всеки 4-ти час добавяме още един час за почивка 
            time++
        }
    }
    console.log(`Time needed: ${time}h.`)
}
 softUniReception(['5','6','4','20'])
// softUniReception(['1','2','3','45'])
// softUniReception(['3','2','5','40'])