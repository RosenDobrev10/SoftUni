import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

let cardTemplate = html`
<ul>
${towns.map(town => html`<li id=${town}>${town}</li>`)}
</ul>
`

let card = document.getElementById('towns')
render(cardTemplate, card)

document.querySelector('button').addEventListener('click', search)

function search() {
   let text = document.getElementById('searchText').value

   let result = towns.filter(town => {
      if (town.includes(text)){
         let match = document.getElementById(`${town}`)
         match.setAttribute('class', 'active')
         return town
      } 
   })
   let resultHtml = document.getElementById('result')
   resultHtml.textContent = `${result.length} matches found`
}
