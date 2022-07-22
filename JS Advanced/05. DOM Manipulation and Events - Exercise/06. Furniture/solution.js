function solve() {

  let [generateBtn, buyBtn] = Array.from(document.querySelectorAll("button"));
  // Избираме всички бутони на страницата правим ги на масив и ги деструктурираме на отделни бутони 
  generateBtn.addEventListener("click", generate);  // Закачаме слушател на бутона 
  buyBtn.addEventListener("click", buy);            // Закачаме слушател на бутона 

  function generate(event) {
    let input = JSON.parse(document.querySelector("textarea").value);   // Взимаме инпута от полето и го парсваме към обект 
    input.forEach((furniture) => {                                      // За всяка подадена мебел

      let tr = document.createElement("tr");                            // Създаваме ред за мебела 

      let td1 = document.createElement("td");                           // Създаваме колона 1
      let img = document.createElement("img");                          // към колоната създаваме снимка 
      img.src = furniture.img;                                          // на снимката задаваме като стойност снимката на мебела 
      td1.appendChild(img);                                             // на колоната правим дете със снимката 
      tr.appendChild(td1);                                              // на реда правим дете със колона 1 

      let td2 = document.createElement("td");                             // Създаваме колона 2
      let p2 = document.createElement("p");                               // към колоната създаваме параграф
      p2.textContent = furniture.name;                                    // на параграфа задаваме като стойност името на мебела 
      td2.appendChild(p2);                                                // на колоната правим дете със параграфа
      tr.appendChild(td2);                                                // на реда правим дете със колона 2             

      let td3 = document.createElement("td");                             // Създаваме колона 3   
      let p3 = document.createElement("p");                               // към колоната създаваме параграф
      p3.textContent = Number(furniture.price);                           // на параграфа задаваме като стойност цената на мебела като число 
      td3.appendChild(p3);                                                // на колоната правим дете със параграфа
      tr.appendChild(td3);                                                // на реда правим дете със колона 3

      let td4 = document.createElement("td");                               // Създаваме колона 4
      let p4 = document.createElement("p");                                 // към колоната създаваме параграф
      p4.textContent = Number(furniture.decFactor);                         // на параграфа задаваме като стойност фактора на мебела като число
      td4.appendChild(p4);                                                  // на колоната правим дете със параграфа
      tr.appendChild(td4);                                                  // на реда правим дете със колона 4

      let td5 = document.createElement("td");                                 // Създаваме колона 5
      let input = document.createElement("input");                            // към колоната създаваме инпут
      input.type = "checkbox";                                                // на инпута задаваме като пропърти checkbox 
      td5.appendChild(input);                                                 // на колоната правим дете със инпута     
      tr.appendChild(td5);                                                    // на реда правим дете със колона 5

      document.querySelector("tbody").appendChild(tr);                        // На тялото закачаме като дете всеки направен ред 
    });
  }

  function buy(event) {
    let checkboxes = Array.from(document.querySelectorAll("tbody input")).filter((checkbox) => checkbox.checked);
    // Намираме всички checkboxove правим ги на масив и ги филтрираме да останат само чекнатите 
    let boughtFurniture = [];       // Правим празен масив, в който ще пълним списъка с купените мебели 
    let totalPrice = 0;             // Правим брояч за цялата сума 
    let totalDecorationFactor = 0;  // правим брояч за декоративния фактор 

    checkboxes.forEach((checkbox) => {                      // Минаваме по всеки един чекбокс от всички чекбоксове 
      let parent = checkbox.parentElement.parentElement;    // Качваме се нагоре по дървото 2 пъти до родителя 
      let data = Array.from(parent.querySelectorAll("p"));  // Данните за мебела са параграфите и ги правим на масив 
      boughtFurniture.push(data[0].textContent);            // към списъка добавяме, на нулев индекс е името на мебела 
      totalPrice += Number(data[1].textContent);            // към крайната цена добавяме, на първи индекс е цената на мебела 
      totalDecorationFactor += Number(data[2].textContent); // към декор фактора добавяме, на втори индекс е дек фактора на мебела 
    });

    let output = document.querySelectorAll("textarea")[1];  // Намираме полето за изписване след бутон buy той е втория на страницата 
    output.textContent += `Bought furniture: ${boughtFurniture.join(", ")}\n`;  // Масива го джойнваме по запетая и интервал 
    output.textContent += `Total price: ${totalPrice.toFixed(2)}\n`;            // крайната цена я правим до втория знак 
    output.textContent += `Average decoration factor: ${totalDecorationFactor / checkboxes.length}`;  
    // събрания дек фактор го делим на отбелязаните чекбоксовете за средно аритметичния
  }
}
