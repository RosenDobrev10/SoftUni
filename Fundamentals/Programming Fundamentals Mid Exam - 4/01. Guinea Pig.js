function guineaPig(input) {

    input = input.map(Number)           // Превръщаме всички стойности в числа и го запазваме в същия масив 
    let food = input.shift() * 1000     // Превръщаме килограмите в грамове 
    let hay = input.shift() * 1000      // Превръщаме килограмите в грамове 
    let cover = input.shift() * 1000    // Превръщаме килограмите в грамове 
    let weight = input.shift() * 1000   // Превръщаме килограмите в грамове 

    for (let i = 1; i <= 30; i++) {     // Проверяваме за един месец от 1 до 30 дни 
        food -= 300                     // Всеки ден изяжда по 300 грама храна 
        if (i % 2 === 0){               // На всеки 2-ри ден 
            hay -= food * 0.05          // Слагаме сено равно на 5 % от оставащата храна 
        }
        if ( i % 3 === 0){              // На всеки 3-ти ден 
            cover -= 1 / 3 * weight     // Слагаме постелваме равна на 1/3 от теглото на морското свинче
        }
        if (food <= 0 || hay <= 0 || cover <= 0){           // Ако някой от консумативите свърши 
            console.log("Merry must go to the pet store!")  // Трябва да отиде да купи
            return;                                         // И програмата приключва
        }
    }
   console.log(`Everything is fine! Puppy is happy! Food: ${(food / 1000).toFixed(2)}, Hay: ${(hay / 1000).toFixed(2)}, Cover: ${(cover /1000).toFixed(2)}.`)
   // Ако всичко е достатъчно, печатаме трите стойности обърнати пак в килограми 
}
guineaPig(["10", "5", "5.2", "1"]);
// guineaPig(["1", "1.5", "3", "1.5"]);
// guineaPig(["9", "5", "5.2", "1"]);
