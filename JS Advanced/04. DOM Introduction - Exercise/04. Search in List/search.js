function search() {

   const search = document.getElementById("searchText").value;
   // изваждаме като променлива от документа по id searchText, тъй като е input взимаме .value
   const towns = document.querySelectorAll("ul#towns li");
   // Взимаме градовете като NodeList като избираме всички li в tag ul s id town 

   for (const town of towns) {            // Минаваме по всеки град от градовете 
      town.style.fontWeight = "normal";   // Махаме удебеляването на шрифта 
      town.style.textDecoration = "";     // Махаме подчертаването 
   }

   let matches = 0;                       // Правим брояч за намерените съвпадения 

   for (const town of towns) {                     // Минаваме по всеки град от градовете
      if (town.textContent.includes(search)) {     // Проверяваме дали в съдържанието на града има написаното в полето Search 
         matches++;                                // Увеличаваме бройката с едно 
         town.style.fontWeight = "bold";           // Удебеляваме шрифта 
         town.style.textDecoration = "underline";  // Подчертаваме думата 
      }
   }

   document.getElementById("result").textContent = `${matches} matches found`;
   // Задаваме на съдържанието на елемента с id result да е интерполирания стринг с намерените съвпадения 
}
