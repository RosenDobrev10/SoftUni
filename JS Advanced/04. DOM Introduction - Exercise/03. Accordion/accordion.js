function toggle() {

    let text = document.getElementById("extra");
    // Изваждаме текста от документа по id extra 
    let button = document.getElementsByClassName("button")[0];
    // Изваждане бутона от документа по class, който е button това връща HTML Collection и трябва да вземем първия елемент 

    if (button.textContent === "More") {    // Ако съдържанието на бутона е More 
        button.textContent = "Less";        // Променяме съдържанието на бутона да е Less 
        text.style.display = "block";       // Променяме стила на показване на текста от none на block 
    } else {                                // Ако съдържанието на бутона е Less
        button.textContent = "More";        // Променяме съдържанието на бутона да е More
        text.style.display = "none";        // Променяме стила на показване на текста от block на none
    }
}
