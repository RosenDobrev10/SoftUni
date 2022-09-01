function attachEvents() {

    document.querySelector("#refresh").addEventListener("click", displayComments); // Взимаме бутона за рефреш и добавяме слушател
    document.querySelector("#submit").addEventListener("click", addComment);    // Взимаме бутона за submit и добавяме слушател 
    let url = "http://localhost:3030/jsonstore/messenger";  // В променлива си взимаме адреса, за заявките 

    function displayComments() {
        fetch(url)                              // Фечваме заявка към адреса 
            .then((response) => {               // Резолваме промиса на хедъра и получаваме респонс
                if (response.ok === false) {    // Ако респонса не е наред 
                    throw new Error("Error");   // Хвърляме грешка 
                }

                return response.json();         // Иначе връщаме респонса прекаран през json()
            })
            .then((data) => {                   // Резолваме промиса на бодито и получаваме данните 
                let textArea = document.getElementById("messages");     // Намираме полето за съобщенията 
                let comments = [];                                      // Правим празен масив за коментарите 
                Object.values(data).forEach((user) =>                   // От получения обект взимаме валютата и минаваме по всеки 
                    comments.push(`${user.author}: ${user.content}`)    // Към масива добавяме името на човека и съдържанието на съобщението 
                );
                textArea.value = comments.join("\n");                   // полето за съобщенията го сетваме да е масива с коментарите и всеки коментар да е на нов ред 
            })
            .catch((error) => alert(error.message));                    // Ако има грешка я показваме 
    }

    function addComment() {
        let authorName = document.querySelector('[name="author"]');     // Намираме полето за името на автора 
        let content = document.querySelector('[name="content"]');       // Намираме полето за съдържанието на съобщението

        if (authorName.value === "" || content.value === "") {          // Ако някое от двете е празно 
            return;                                                     // Прекъсваме функцията 
        }

        fetch(url, {                                                // Фечваме заявка към адреса, като втори параметър даваме обект 
            method: "post",                                         // метода на заявката 
            headers: {                                              // хедърите 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({                                  // Бодито е задължително JSON.stringify и подаваме обекта 
                author: authorName.value.trim(),                    // Автора с въведенето в полето с изрязани спейсове 
                content: content.value.trim(),                      // Съдържанието с въведенето в полето с изрязани спейсове 
            }),
        })
            .then((response) => {                                  // Получаваме респонса 
                if (response.ok === false) {                        // Ако не е наред 
                    throw new Error("Error");                       // Хвърляме грешка 
                }

                return response.json();                             // Иначе връщаме респонса 
            })
            .catch((error) => alert(error));                        // Хвърляме грешка ако намерим някъде 

        authorName.value = "";                                      // Зачистваме полето за автора 
        content.value = "";                                         // Зачистваме полето за съдържанието 
        displayComments();                                          // Всеки път когато добавим коментар, показваме съобщенията 
    }
}
attachEvents();
