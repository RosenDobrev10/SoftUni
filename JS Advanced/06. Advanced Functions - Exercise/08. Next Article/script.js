function getArticleGenerator(articles) {

    const div = document.getElementById("content");             // Изваждаме като променлива полето с id content 

    return function () {                                        // Връщаме резултат от функция 
        const article = articles.shift();                       // От списъка със статии, вадим първата статия 
        if (article !== undefined) {                            // Ако това, което извадим от масива е статия(ИМА ТАКАВА)
            const articleElement = document.createElement("article");  // Създаваме елемент от тип article 
            articleElement.textContent = article;                      // Задаваме съдържанието на елемента да е самата статия      
            div.appendChild(articleElement);                           // Закачаме като дете на дива, създадения елемент
        }
    };
}
