function solve() {

   document.querySelector("#searchBtn").addEventListener("click", onClick);
   // Когато се натисне върху бутона се активира нашата функция 
   let rows = document.querySelectorAll("tbody tr");     // Намираме всички редове в таблицата като избираме само tbody 
   let input = document.getElementById("searchField");   // Намираме инпут полето по id 

   function onClick() {

      for (let row of rows) {                         // Минаваме по всеки ред от редовете 
         row.classList.remove("select");              // Премахваме класа, ако вече имаме сложен такъв 
         if (row.innerHTML.includes(input.value)) {   // innerHTML проверява във всички деца на елемента, който сме избрали 
            row.className = "select";                 // Ако намери на самият ред слагаме className = select 
         }
      }

      input.value = "";                               // След въртенето на цикъла и търсенето зачистваме инпут полето да е празно 
   }

}
