function deleteByEmail() {

    let email = document.getElementsByName("email")[0];  
    // Взимаме референция към инпут полето по името на тага, връща HTML collection и взимаме нулевия елемент 
    let secondColumn = document.querySelectorAll("#customers tr td:nth-child(2)");   // Взимаме всички редове от таблицата 
    let result = document.getElementById("result");     // Взимаме реф към див-а с id result 

    for (let td of secondColumn) {                                 // Минаваме по редовете на таблицата 
        if (email.value === td.textContent) {  // Ако стойността на въведеното е равно на съдържанието в колона 2 от таблицата 
            result.textContent = "Deleted.";                 // Променяме да изпише Deleted
            let row = td.parentElement 
            row.parentElement.removeChild(row);                // Намираме родителя на row и му казваме да изтрие детето row
        } else {                                            // Ако не намерим съвпадение в имейлите 
            result.textContent = "Not found.";              // Изписваме, че не е намерен 
        }
    }
    email.value = "";                                      // Изчистваме инпут полето 
}
