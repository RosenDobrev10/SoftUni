function deleteByEmail() {

    let input = document.getElementsByTagName("input")[0];  
    // Взимаме референция към инпут полето по името на тага, връща HTML collection и взимаме нулевия елемент 
    let rows = document.querySelectorAll("tbody tr");   // Взимаме всички редове от таблицата 
    let result = document.getElementById("result");     // Взимаме реф към див-а с id result 

    for (let row of rows) {                                 // Минаваме по редовете на таблицата 
        if (input.value === row.children[1].textContent) {  // Ако стойността на въведеното е равно на съдържанието в колона 2 от таблицата 
            result.textContent = "Deleted.";                 // Променяме да изпише Deleted 
            row.parentElement.removeChild(row);                // Намираме родителя на row и му казваме да изтрие детето row 
        } else {                                            // Ако не намерим съвпадение в имейлите 
            result.textContent = "Not found.";              // Изписваме, че не е намерен 
        }
    }
    input.value = "";                                      // Изчистваме инпут полето 
}
