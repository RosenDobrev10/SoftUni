window.addEventListener("load", solve)

function solve() {                                

  const inputs = {                                      // Създаваме обект с инпут полетата 
    title: document.getElementById("post-title"),       // Създаваме пропърти title с value селектирания елемент по id 
    category: document.getElementById("post-category"), // Създаваме пропърти category с value селектирания елемент по id
    content: document.getElementById("post-content"),   // Създаваме пропърти content с value селектирания елемент по id
  };

  const lists = {                                         // Създаваме обект с листовете
    review: document.getElementById("review-list"),       // Създаваме пропърти review с value селектирания елемент по id 
    published: document.getElementById("published-list"), // Създаваме пропърти published с value селектирания елемент по id 
  };

  document.getElementById("publish-btn").addEventListener("click", publish);  // Добавяме слушател за двата бутона селектирани по id 
  document.getElementById("clear-btn").addEventListener("click", clear);      // Добавяме слушател за двата бутона селектирани по id

  function publish(event) {               // Създаваме функция за публикуването 
    event.preventDefault();               // Добавяме preventDefault, за да спрем рефрешване, ако имаме submit button 

    const title = inputs.title.value;         // Взимаме в променлива стойността от инпут полето за title 
    const category = inputs.category.value;   // Взимаме в променлива стойността от инпут полето за category
    const content = inputs.content.value;     // Взимаме в променлива стойността от инпут полето за content

    if (title === "" || category === "" || content === "") {  // Ако едно от трите е празен стринг 
      return;                                                 // Прекратяваме и не правим нищо 
    }

    const li = document.createElement("li");                  // Създаваме си li елемент
    li.className = "rpost";                                   // Добавяме му клас с даденото име 
    li.innerHTML = `<article>                                 
        <h4>${title}</h4>
        <p>Category: ${category}</p>
        <p>Content: ${content}</p>
    </article>
    <button class="action-btn edit">Edit</button>
    <button class="action-btn approve">Approve</button>`;
    // Добавяме в интерполиран стринг цялата секция за ли елемента 

    lists.review.appendChild(li);                       // Добавяме към review ul, създадения li element 

    inputs.title.value = "";                            // Зачистваме инпут полето за title
    inputs.category.value = "";                         // Зачистваме инпут полето за category
    inputs.content.value = "";                          // Зачистваме инпут полето за content

    const editBtn = li.querySelector(".edit");          // Селектираме Edit по клас, но задължително не на document, а на новосъздадения li  
    const approveBtn = li.querySelector(".approve");    // Селектираме Approve по клас, но задължително не на document, а на новосъздадения li
    editBtn.addEventListener("click", edit);            // Добавяме слушател на двата бутона 
    approveBtn.addEventListener("click", approve);      // Добавяме слушател на двата бутона 

    function edit() {                                   // Създаваме функция за бутона Edit 

      inputs.title.value = title;                       // на инпут полето за title сетваме взетата стойност в началото 
      inputs.category.value = category;                 // на инпут полето за category сетваме взетата стойност в началото
      inputs.content.value = content;                   // на инпут полето за content сетваме взетата стойност в началото

      li.remove();                                      // Премахваме създадения li елемент 
    }

    function approve() {                                // Създаваме функция за бутона Аpprove

      lists.published.appendChild(li); // Закачаме създадения li елемент за другия списък с публикуваните, така се премахва от другия списък 

      editBtn.remove();                 // Премахваме бутона Edit 
      approveBtn.remove();              // Премахваме бутона Approve 
    }
  }

  function clear() {                    // Създаваме функция за бутона Clear
    lists.published.innerHTML = "";     // Когато сложим innerHTML да е празен стринг изчиства всичко в дадения елемент 
  }
}
