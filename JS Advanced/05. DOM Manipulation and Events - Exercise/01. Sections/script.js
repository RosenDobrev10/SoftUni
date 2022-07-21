function create(words) {

   const content = document.getElementById("content");   // Намираме елемента с Id content 

   for (const word of words) {                           // Минаваме по всяка дума от дадения ни масив с думи 
      const div = document.createElement("div");         // Създаваме div елемент 
      const p = document.createElement("p");             // Създаваме p елемент
      p.textContent = word;                              // Добавяме към съдържанието на параграфа съответната дума от масива 
      p.style.display = "none";                          // Първоначално правим да не се вижда текста на параграфа
      div.appendChild(p);                                // Закачаме като дете параграфа към дива
      content.appendChild(div);                          // Закачаме като дете дива към контента 
      div.addEventListener("click", reveal);             // Добавяме към дива слушател, при кликане да се покаже съдържанието 

      function reveal(event) {
         event.currentTarget.children[0].style.display = "";
         // на евента текущата секция, която е кликната. Нейното дете(параграфа) да се покаже съобщението 
      }
   }
}
