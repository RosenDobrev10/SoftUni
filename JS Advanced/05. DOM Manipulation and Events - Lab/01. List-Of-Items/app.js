function addItem() {

    const input = document.getElementById("newItemText").value; // Взимаме референция към инпут полето и взимаме стойността
    const li = document.createElement("li");                    // Създаваме нов li element, за да добавим към списъка 
    li.textContent = input;                                     // Съдържанието на ли елемента е равно на взетото от инпут полето 
    document.getElementById("items").appendChild(li);           // Към списъка с елементи с id итемс, закачаме създаденото ли като дете 
    document.getElementById("newItemText").value = "";          // ресетваме инпут полето да е празно, за ново въвеждане на данни 
}
