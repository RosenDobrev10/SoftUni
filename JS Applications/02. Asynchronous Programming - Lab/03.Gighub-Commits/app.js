async function loadCommits() {

    const username = document.getElementById("username").value; // Взимаме въведеното в инпут полето за username
    const repo = document.getElementById("repo").value;         // Взимаме въведеното в инпут полето за repo
    const list = document.getElementById("commits");            // Намираме списъка с комитите 

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        // Взимаме като променлива респонса от линка 

        if (response.ok === false) {    // Ако респонса не е окей
            throw new Error(`${response.status} ${response.statusText}`);   // Хвърляме грешка 
        }

        const data = await response.json(); // Взимаме на респонса неговата data, те са масив с обекти 
        list.innerHTML = "";                // Зачистваме списъка 

        for (let { commit } of data) {      // Минаваме по всеки комит от списъка с данните 
            list.innerHTML += `<li>${commit.author.name} ${commit.message}</li>`;   //  Към innerHTML добавяме всеки автор и съобщението 
        }
    } catch (error) {                                   // Ако някъде уловим грешка 
        list.innerHTML = `Error: ${error.message}`;     // Изписваме следното съобщение 
    }
}
