function calc() {

    const num1 = Number(document.getElementById("num1").value);
    // Взимаме по id първото поле и след това достъпваме неговото value като го правим на число с Number 
    const num2 = Number(document.getElementById("num2").value);
    // Взимаме по id второто поле и след това достъпваме неговото value като го правим на число с Number 
    document.getElementById("sum").value = num1 + num2;
    // Полето с id sum го намираме и сетваме негото value да е сбора от двете извадени числа 
}
