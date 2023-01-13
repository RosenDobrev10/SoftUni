function extractText() {

    const items = Array.from(document.querySelectorAll("li"));
    // Избираме всички елементи с li от документа и ги превръщаме в масив 
    const result = items.map((el) => el.textContent).join("\n");
    // Минаваме по масива и взимаме на всеки елемент неговия текст и го съединяваме по нов ред
    document.getElementById("result").value = result; // Променяме стойността на елемента с id=result на получения резултат 
}
