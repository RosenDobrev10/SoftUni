import page from '../node_modules/page/page.mjs'
import {html, render} from '../node_modules/lit-html/lit-html.js'

let catalogTemplate = (catalog) => html `
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${catalog.map(card => html `<div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${"01.Furniture/" + card.img} />
                            <p>${card.description}</p>
                            <footer>
                                <p>Price: <span>${card.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${card._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`
            ) }
        </div>
`

const getCatalog = () => {
    return fetch('http://localhost:3030/data/catalog')
    .then(response => response.json())
    .then(data => Object.values(data))
}

export const catalogView = ctx =>
getCatalog()
.then(catalog => render(catalogTemplate(catalog), document.querySelector('.container') ))