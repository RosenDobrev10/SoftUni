function validate() {

    const emailElement = document.getElementById("email");  // Намираме елемента за въвеждане на email po id 
    emailElement.addEventListener("change", () => { // Закрепяме слушател към този елемент и при промяна в полето изпълняваме ф-я
        const pattern = /^[a-z]+@[a-z]+\.[a-z]+$/g; // Създаваме патърн, само малки латински букви и между тях да има @ и .
        if (pattern.test(emailElement.value)) {     // Ако въведеното в имейл полето минава патърна 
            emailElement.classList.remove("error"); // Премахваме класа error от имейл елемента 
        } else {                                    // Ако въведеното в имейл полето минава патърна    
            emailElement.classList.add("error");    // Добавяме класа error от имейл елемента
        }
    });
}
