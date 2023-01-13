function extractText() {

    const items = document.querySelectorAll("ul#items li");
    // Избираме всички елементи с li от документа
    const textarea = document.querySelector("#result");
    // Избираме елемента с id = result 
    for (const item of items) {
        // Променяме стойността на елемента с id=result на получения резултат
        textarea.value += item.textContent + "\n";
    }
}
