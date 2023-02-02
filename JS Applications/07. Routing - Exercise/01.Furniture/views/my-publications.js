import page from '../node_modules/page/page.mjs'
import {html, render} from '../node_modules/lit-html/lit-html.js'

const publicationsTemplate = (catalog) => html `
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${catalog.map(item => html `
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${"01.Furniture/" + item.img} />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
            `)}
        </div>
`

const getMyPublications = () => {
    return fetch('http://localhost:3030/data/catalog')
    .then(response => response.json())
    .then(data => {
        return Object.values(data.filter(x => x._ownerId === localStorage.ownerId))
    })
}

export const myPublicationsView = (ctx) => 
    getMyPublications()
    .then(catalog => render(publicationsTemplate(catalog), document.querySelector('.container')))
