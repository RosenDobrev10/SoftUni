function colorize() {

    const rows = document.querySelectorAll("tr");   // Взимаме ВСИЧКИ редове от таблицата като ги вадим с tr

    for (let i = 1; i < rows.length; i += 2) {      // Минаваме по всички нечетни редове на колекцията ни 
        rows[i].style.backgroundColor = "teal";     // Задаваме на елемента цвета му да е teal 
    }
}
