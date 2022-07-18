function addItem() {

    const input = document.getElementById("newItemText").value; // Взимаме референция към инпут полето и взимаме стойността
    const li = document.createElement("li");                    // Създаваме нов li element, за да добавим към списъка 
    li.textContent = input;                                     // Съдържанието на ли елемента е равно на взетото от инпут полето
    document.getElementById("items").appendChild(li);           // Към списъка с елементи с id итемс, закачаме създаденото ли като дете 
    document.getElementById("newItemText").value = "";          // ресетваме инпут полето да е празно, за ново въвеждане на данни

    const deleteButton = document.createElement('a')            // Създаваме елемент с таг a 
    deleteButton.textContent = '[Delete]'                       // текста на бутона е [Delete]
    deleteButton.href = '#'                                     // Задаваме да има атрибут href = # 
    li.appendChild(deleteButton)                                // Закачаме елемента а като дете на всеки продукт 
    deleteButton.addEventListener('click', onDelete)            // Закачаме слушател при кликване да изпълни функция
    
    function onDelete(event) {  
        event.target.parentElement.remove()     
        // Имаме променлива event, тя има таргет, къде е натиснато точно, нейния родител е целият ред, който го трием
    }
} 
