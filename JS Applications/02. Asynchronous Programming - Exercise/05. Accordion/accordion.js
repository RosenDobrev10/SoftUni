async function solution() {
    try {
        let url = "http://localhost:3030/jsonstore/advanced/articles/list"; // Запазваме линка в променлива
        let response = await fetch(url);                                    // awaitvame заявката и получаваме responsa

        if (response.ok === false) {                                        // Ако отговора от заявката е грешен 
            throw new Error("Error obtaining article list");                // Хвърляме грешка 
        }

        let data = await response.json();                                   // awaitwame responsa и получаваме данните

        data.forEach((article) => {                                         // Минаваме по всяка статия получена от сървъра, тя е обект 
            let articleElement = document.createElement("div");             // Създаваме div елемент 
            articleElement.classList.add("accordion");                      // Добавяме му клас 
            articleElement.innerHTML = `                                    
            <div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}" onclick="moreOnclick(event)">More</button>
            </div>
            <div class="extra"></div>
            `;
            // Добавяме към innerHTML съответните елементи 
            let main = document.getElementById("main");     // Взимаме в променлива елемента с id main 
            main.appendChild(articleElement);               // Добавяме article към main 
        });
    } catch (error) {
        console.log(error);
    }
}

async function moreOnclick(event) {
    try {
        let currentTarget = event.currentTarget;                            // запазваме в променлива, кой article е натиснат бутона му 
        let url ="http://localhost:3030/jsonstore/advanced/articles/details/" + currentTarget.id; // Записваме си URL 
        let parent = currentTarget.parentNode.parentNode;                   // Качваме се 2 елемента по нагоре от натиснатия 
        let extraDiv = parent.querySelector("div.extra");                   // Селектираме див екстра елемента 

        let response = await fetch(url);                                    // await url и получаваме респонса 

        if (response.ok === false) {                                        // Ако респонса не е ок
            throw new Error(`Error obtaining article details`);             // Хвърляме грешка 
        }

        let data = await response.json();                                   // await response.json() и получаваме data 

        extraDiv.innerHTML = `<p>${data.content}</p>`;                      // Добавяме към extradiv параграфа със съдържанието

        if (currentTarget.textContent === "More") {                         // Ако съдържанието на натиснатия е More 
            currentTarget.textContent = "Less";                             // Сменяме го на Less
            extraDiv.style.display = "block";                               // и го показваме 
        } else {                                                            // Ако съдържанието на натиснатия е Less
            currentTarget.textContent = "More";                             // Сменяме го на More
            extraDiv.style.display = "none";                                // и го скриваме 
        }
    } catch (error) {
        console.log(error);
    }
}
solution();
