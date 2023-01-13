function editElement(element, match, replacer) {

    const text = element.textContent;               // Взимаме в променлива текста от елемента
    const pattern = new RegExp(match, "g");         // Създаваме патърн, който да замени намери всички match
    const result = text.replace(pattern, replacer); // Създаваме променлива result, която заменя всички намерени мачове с риплейсъра
    element.textContent = result;                   // текста от елемента е равна вече на резултата
}
