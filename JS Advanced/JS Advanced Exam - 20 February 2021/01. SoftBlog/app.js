function solve() {
   
   const inputCreator = document.getElementById("creator");
   const inputTitle = document.getElementById("title");
   const inputCategory = document.getElementById("category");
   const inputContent = document.getElementById("content");

   const createBtn = document.querySelector("button");

   createBtn.addEventListener("click", create);

   function create(event) {
      event.preventDefault();

      const creator = inputCreator.value;
      const title = inputTitle.value;
      const category = inputCategory.value;
      const content = inputContent.value;

      const postSection = document.querySelector(".site-content section");

      const article = document.createElement("article");

      const h1Title = document.createElement("h1");
      h1Title.textContent = title;

      const pCategory = document.createElement("p");
      pCategory.textContent = `Category:`;

      const strongCategory = document.createElement("strong");
      strongCategory.textContent = category;

      const pCreator = document.createElement("p");
      pCreator.textContent = `Creator:`;

      const strongCreator = document.createElement("strong");
      strongCreator.textContent = creator;

      const pContent = document.createElement("p");
      pContent.textContent = content;

      const divButtons = document.createElement("div");
      divButtons.classList.add("buttons");

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn");
      deleteBtn.classList.add("delete");
      deleteBtn.textContent = "Delete";

      const archiveBtn = document.createElement("button");
      archiveBtn.classList.add("btn");
      archiveBtn.classList.add("archive");
      archiveBtn.textContent = "Archive";

      postSection.appendChild(article);
      article.appendChild(h1Title);
      article.appendChild(pCategory);
      pCategory.appendChild(strongCategory);
      article.appendChild(pCreator);
      pCreator.appendChild(strongCreator);
      article.appendChild(pContent);
      article.appendChild(divButtons);
      divButtons.appendChild(deleteBtn);
      divButtons.appendChild(archiveBtn);

      archiveBtn.addEventListener("click", archive);

      function archive() {
         article.remove();

         const olArchive = document.querySelector("ol");

         const liArchive = document.createElement("li");
         liArchive.textContent = title;
         olArchive.appendChild(liArchive);

         const titles = Array.from(document.querySelectorAll("li"));
         titles
            .sort((a, b) => a.textContent.localeCompare(b.textContent))
            .forEach((node) => olArchive.appendChild(node));
      }

      deleteBtn.addEventListener("click", deleteFunction);

      function deleteFunction() {
         article.remove();
      }
   }
}
