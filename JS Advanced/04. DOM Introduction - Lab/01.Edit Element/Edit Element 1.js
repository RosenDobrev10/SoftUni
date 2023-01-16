function editElement(element, match, replacer) {

  const text = element.textContent;                 // Взимаме в променлива текста от елемента 
  const result = text.split(match).join(replacer);  // Разделяме текста по съвпадението и го събираме по риплейсъра 
  element.textContent = result;                     // Текста на елемента, вече е равен на резултата 
}
