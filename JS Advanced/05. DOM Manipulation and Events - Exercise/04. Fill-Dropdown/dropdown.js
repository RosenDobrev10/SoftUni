function addItem() {

    let newItemText = document.getElementById("newItemText");       // Намираме полето с id newItemText
    let newItemValue = document.getElementById("newItemValue");     // Намираме полето с id newItemValue

    let optionTag = document.createElement("option");               // Създаваме таг с име option 
    optionTag.textContent = newItemText.value;                      // като съдържание му даваме взетото от инпут полето 
    optionTag.value = newItemValue.value;                           // като стойност му даваме взетото от инпут полето

    let selectTag = document.getElementById("menu");                // Намираме полето с id menu 
    selectTag.appendChild(optionTag);                               // Създаваме на select дете с име optionTag
    newItemText.value = "";                                         // Изчистваме едното инпут поле 
    newItemValue.value = "";                                        // Изчистваме другото инпут поле     
}
