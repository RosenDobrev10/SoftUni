function solve() {

  let input = document.getElementById("input").value;
  // Взимаме инпута и неговата стойност като променлива 
  let output = document.getElementById("output");
  // Взимаме outputa като променлива по id 

  let sentences = input.split(".").filter((s) => s.length !== 0);
  // Изваждаме изреченията от инпута като ги делим по точка и ги филтрираме, за да нямаме празни изречения 

  while (sentences.length > 0) {                                  // Докато има изреченията въртим цикъл 
    let textParagraph = sentences.splice(0, 3).join(". ") + ".";  
    // Нашият текст в параграфа ще е максимум 3 изречения като ги съединяваме по точка и интервал и добавяме точка накрая 
    let p = document.createElement("p");    // създаваме си параграф с createElement и посочваме какъв вид да е в скобите 
    p.textContent = textParagraph;          // Съдържанието на параграфа ще е това, което сме получили от текста 
    output.appendChild(p);                  // на outputa създаваме дете с получения параграф 
  }
}
