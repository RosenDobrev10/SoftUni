function solve() {

    const input = {                                 // Създаваме си обект с инпут полетата от първата секция 
        name: document.getElementById("task"),
        description: document.getElementById("description"),
        date: document.getElementById("date"),
    };

    const [addTaskSection, openSection, progressSection, finishedSection] = Array.from(document.querySelectorAll("section")).map((e) => e.children[1]);
    // Намираме 4-те секции и ги правим на масив, след това взимаме второто дете на секцията, което е празния див, в който трябва да
    // местим създадените таскове и ги деструктурираме 
    document.getElementById("add").addEventListener("click", addTask);  // Добавяме слушател за бутона add от първата секция 

    function addTask(event) {        // Създаваме функция, която ще създава таскове и ще ги мести 
        event.preventDefault();      // preventDefault = Не позволява да се извършва поведението на бутона по подразбиране

        const article = document.createElement("article");              // Създаваме си елемент от тип article 
        article.appendChild(createElement("h3", input.name.value));     // Добавяме дете към article, с елемент създаден от функцията createElement
        article.appendChild(createElement("p", `Description: ${input.description.value}`)); // Добавяме дете към article, с елемент създаден от функцията createElement
        article.appendChild(createElement("p", `Due Date: ${input.date.value}`));   // Добавяме дете към article, с елемент създаден от функцията createElement

        const div = createElement("div", "", "flex");   // Създаваме div елемент, без съдържание но с клас flex 

        const startButton = createElement("button", "Start", "green");  // Създаваме бутон със съдържание Start и клас green 
        div.appendChild(startButton);                                   // Закачаме бутона за създадения div 

        const deleteButton = createElement("button", "Delete", "red");  // Създаваме бутон със съдържание Delete и клас red
        div.appendChild(deleteButton);                                  // Закачаме бутона за създадения div 

        const finishButton = createElement("button", "Finish", "orange");   // Създаваме бутон със съдържание Finish и клас orange

        article.appendChild(div);           // Към article закачаме създадения div 

        openSection.appendChild(article);   // Към open section закачаме създадения article 

        Object.values(input).forEach((input) => (input.value = ""));    // Минаваме по обекта и за всеки input зачистваме въведеното

        deleteButton.addEventListener("click", onDelete);   // Слагаме слушател за поведението на трите създадени бутона
        startButton.addEventListener("click", onStart);     // Слагаме слушател за поведението на трите създадени бутона 
        finishButton.addEventListener("click", onFinish);   // Слагаме слушател за поведението на трите създадени бутона

        function onDelete() {                               // Функцията за бутона за Delete 
            article.remove();                               // При натискане се изтрива целия article елемент 
        }

        function onStart() {                                // Функцията за бутона за Start
            startButton.remove();                           // Премахване бутона за Start
            div.appendChild(finishButton);                  // Добавяме бутона за Finish 
            progressSection.appendChild(article);           // Преместваме article ot OpenSection в progressSection
        }

        function onFinish() {                               // Функцията за бутона за Finish
            div.remove();                                   // Изтриваме целия див елемент 
            finishedSection.appendChild(article);           // Преместваме article ot progressSection в finishedSection 
        }
    }

    function createElement(type, content, className) {  // Създаваме функция, която ще създава елементи по подаден тип, съдържание и клас 
        const element = document.createElement(type);   // Елемента, който ще се създава, ще приема подадения тип 
        element.textContent = content;                  // Съдържанието на елемента, ще е подаденото съдържание 
        if (className) {                                // Ако има подаден клас 
            element.className = className;              // Само тогава ще добавяме и подадения клас 
        }
        return element;                                 // Функцията ще връща създадения елемент 
    }
}
