async function loadRepos() {    // Декларира, че функцията ще е асинхронна 

    const username = document.getElementById("username").value; // Взимаме като променлива въведения username в инпут полето
    const list = document.getElementById("repos"); 				// Намираме списъка, в който трябва да въведем репотата

    try {                                                   // В try ни е успешния край 
        const response = await fetch(`https://api.github.com/users/${username}/repos`) 
        // Въвеждаме URL-а, от който ще вадим информация като му кажем await, НЕ ПОЛУЧАВАМЕ PROMISE, а директно негогия респонсе

        if (response.ok === false) {										// Ако не сме получили response, който да е true 
            throw new Error(`${response.status} ${response.statusText}`);	// Хвърляме грешка, като взимаме статуса и текста на респонса 
        }

        const data = await response.json()                                  // чрез await, не получаваме PROMISE, а неговите данни 

        list.innerHTML = "";												// Зачистваме първо въведените преди това репота 

        for (let repo of data) {											// Минаваме по всяко репо от получените в data
            list.innerHTML += `<li>											
        <a href="${repo.html_url}">
            ${repo.full_name}
        </a>
    </li>`;
            // Сетваме innerHTML да е полученото от html_url и full_name в литата в листа 
        }
    } catch (error) {                           // в catch ни е ако уловим грешка
        list.innerHTML = `${error.message}`     // Показваме грешката в уловения лист
    }

}
