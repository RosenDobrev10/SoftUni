function validate() {

    document.getElementById("company").addEventListener("change", () => {   // Добавяме слушател за company elementa 
        const companyInfo = document.getElementById("companyInfo");         // Намираме елемента за компанията 
        if (document.getElementById("company").checked === false) {         // Ако тикчето не е маркирано 
            companyInfo.style.display = "none";                             // Скриваме съдържанието 
        } else {                                                            // Ако тикчето е маркирано
            companyInfo.style.display = "block";                            // Показваме съдържанието
        }
    });

    document.getElementById("submit").addEventListener("click", onClick);   // Добавяме слушател за submit бутона 

    function onClick(event) {                                               // Създаваме функция, която да отговаря за това 
        event.preventDefault();     // Тъй като submit бутона е във form поле, добавяме preventDefault, за да не рефрешва с-цата

        let invalidFields = [];                             // Създаваме си масив със всички невалидни полето, които сме проверили 
        
        let username = document.getElementById("username"); // Намираме username полето 
        const usernamePattern = /^[a-zA-Z0-9]{3,20}$/g;     // Създаваме си патърн за username 
        if (!usernamePattern.test(username.value)) {        // Проверяме дали е грешен 
            invalidFields.push(username);                   // Ако е грешен го добавяме към масива с невалидните полета 
        }
        
        let email = document.getElementById("email");       // Намираме email полето 
        const emailPattern = /^.*@.*\..*$/g;                // Създаваме си патърн за email
        if (!emailPattern.test(email.value)) {              // Проверяваме дали е грешен 
            invalidFields.push(email);                      // Ако е грешен го добавяме към масива с невалидните полета 
        }
        
        let password = document.getElementById("password");                 // Намираме password полето     
        let confirmPassword = document.getElementById("confirm-password");  // Намираме confirmPassword полето 
        const passwordPattern = /^[\w]{5,15}$/g;                            // Създаваме си патърн за password
        if (!passwordPattern.test(password.value) || password.value !== confirmPassword.value) { // Проверяваме дали е грешен или дали не съвпадат паролите 
            invalidFields.push(password);               // Ако е така ги добавяме към масива с невалидните полета 
            invalidFields.push(confirmPassword);        // Ако е така ги добавяме към масива с невалидните полета 
            }
            
        let checkbox = document.getElementById("company");              // Намираме си полето с checkbox за компания 

        if (checkbox.checked) {                                         // Ако полето е маркирано 
            let companyId = document.getElementById("companyNumber");   // Намираме полето за въвеждане на номер 
            const companyPattern = /^[0-9]{4}$/g;                       // Полето трябва да има 4 цифри 
            if (!companyPattern.test(companyId.value) || companyId.value < 1000) {   // Ако не минава регекса или числото е под 1000
                invalidFields.push(companyId);                          // Добавяме го към невалидните полета 
            }
        }

        invalidFields.forEach((field) => (field.style.borderColor = "red")); 
        // за всички невалидни полета, добавяме полето да се огради в червено 

        invalidFields.length === 0                                          // Ако броя на невалидните полета е 0(НЯМАМЕ ТАКИВА)
            ? (document.querySelector("#valid").style.display = "block")    // Показваме надписа valid 
            : (document.querySelector("#valid").style.display = "none")     // Иначе скриваме надписа valid 
    }
}
