function validate() {
    
    const email = document.getElementById("email");     // Намираме полето за email 
    email.addEventListener("change", onChange);         // Добавяме слушател, при промяна в полето задействаме функцията 

    function onChange(event) {                          // Създаваме функцията
        const pattern = /^[a-z]+@[a-z]+\.[a-z]+$/g;     // Патърна за името на въведения имейл 
        if (pattern.test(event.target.value)) {         // Ако в патърна се съдържа стринга въведен в полето за имейл 
            event.target.classList.remove("error");     // махаме класа error 
        } else {                                        // Ако в патърна НЕ се съдържа стринга въведен в полето за имейл
            event.target.classList.add("error");        // Добавяме класа error 
        }
    }

}
