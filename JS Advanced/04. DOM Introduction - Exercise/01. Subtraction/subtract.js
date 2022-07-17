function subtract() {

    const num1 = Number(document.getElementById("firstNumber").value);
    // Взимаме елемента с id firstNumber, той е от тип input. Техните стойности се взимат с .value и го парсваме към число 
    const num2 = Number(document.getElementById("secondNumber").value);
    document.getElementById("result").textContent = num1 - num2;
    // За да запишем стойността в елемента, трябва да достъпим неговия textContent 
}
