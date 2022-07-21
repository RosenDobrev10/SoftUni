function lockedProfile() {

    Array.from(document.querySelectorAll(".profile button")).forEach((b) => b.addEventListener("click", toggle));
    // Избираме всички бутони в дивовете с клас profile. Правим ги на масив, минаваме по всеки бутон и добавяме слушател 

    function toggle(event) {
        const profile = event.target.parentElement; // Намираме родителя на натиснатия бутон 
        const isActive = profile.querySelector('input[type="radio"][value="unlock"]').checked;
        // Проверяваме дали на профила радио бутона със стойност unlock е чекнат 

        if (isActive) { // Ако е чекнат бутона 
            let div = profile.querySelector("div");         // Намираме дива в профила, който отговаря за доп информация 

            if (event.target.textContent === "Show more") {     // Ако текста на бутона е Show More 
                div.style.display = "block";                    // Показваме информацията 
                event.target.textContent = "Hide it";           // Сменяме текста на бутона 
            } else {                                            // Ако текста на бутона е Hide it
                div.style.display = "none";                     // Скриваме информацията
                event.target.textContent = "Show more";         // Сменяме текста на бутона
            }
        }
    }
}
