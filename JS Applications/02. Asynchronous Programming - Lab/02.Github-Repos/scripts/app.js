function loadRepos() {

	const username = document.getElementById("username").value; // Взимаме като променлива въведения username в инпут полето
	const list = document.getElementById("repos"); 				// Намираме списъка, в който трябва да въведем репотата

	fetch(`https://api.github.com/users/${username}/repos`) 	// Въвеждаме URL-а, от който ще вадим информация
		.then(handleResponse) 									// s then получаваме response, обработваме го във функцията handleResponse
		.then(displayRepos)										// s then получаваме data, обработваме я във displayRepos
		.catch(handleError);									// s catch улавяме ако има грешка и я обработваме с handleError

	function handleResponse(response) {
		if (response.ok === false) {										// Ако не сме получили response, който да е true 
			throw new Error(`${response.status} ${response.statusText}`);	// Хвърляме грешка, като взимаме статуса и текста на респонса 
		}

		return response.json();												// Ако всичко е наред взимаме json na респонса
	}

	function displayRepos(data) {										
		list.innerHTML = "";												// Зачистваме първо въведените преди това репота 
		for (let repo of data) {											// Минаваме по всяко репо от получените в data
			list.innerHTML += `<li>											
            <a href="${repo.html_url}">
                ${repo.full_name}
            </a>
        </li>`;
		// Сетваме innerHTML да е полученото от html_url и full_name в литата в листа 
		}
	}

	function handleError(error) {										
		list.innerHTML = `${error.message}`;							// вместо репотата зареждаме съобщението от получената грешка 
	}
}
