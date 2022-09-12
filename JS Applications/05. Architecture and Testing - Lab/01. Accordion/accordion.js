async function solution() {
    const main = document.querySelector('#main');
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const articles = await response.json();

    articles
        .map(createArticle)
        .forEach(a => main.appendChild(a));
}

solution();

function createArticle({ _id, title }) {
    let content = null;
    let more = false;

    const element = document.createElement('div');
    element.className = 'accordion';
    element.innerHTML = `
    <div class="head">
        <span>${title}</span>
        <button class="button" id="${_id}">More</button>
    </div>
    <div class="extra" style="display: none;">
        <p></p>
    </div>`;

    const extra = element.querySelector('.extra');
    const btn = element.querySelector('button');
    btn.addEventListener('click', toggleMore);

    return element;

    async function toggleMore() {
        if (content == null) {
            const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/details/' + _id);
            const article = await response.json();
            content = article.content;
            extra.innerHTML = `<p>${content}</p>`;
        }
        if (more) {
            more = false;
            btn.textContent = 'More';
            extra.style.display = 'none';
        } else {
            more = true;
            btn.textContent = 'Less';
            extra.style.display = 'block';
        }
    }
}
