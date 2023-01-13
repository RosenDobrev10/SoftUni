function sumTable() {
    
    const rows = Array.from(document.querySelectorAll("table tr")); // Изваждаме всички редове от таблицата и ги правим на масив 
    let sum = 0;                                                    // Правим си променлива да събираме сумата 

    for (let i = 1; i < rows.length - 1; i++) {                     // Минаваме по редовете като махаме първия и последния 
        sum += Number(rows[i].lastElementChild.textContent);
        // Намираме на всеки ред последното дете и взимаме съдържанието като го правим на число и го добавяме към сумата        
    }

    document.getElementById("sum").textContent = sum;   // Променяме съдържанието на id sum с получената сума 
}
