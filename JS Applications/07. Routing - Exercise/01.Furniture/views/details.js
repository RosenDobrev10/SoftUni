import page from '../node_modules/page/page.mjs'
import {html, render} from '../node_modules/lit-html/lit-html.js'

const detailsTemplate = (furniture) => html `
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
        <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${"01.Furniture/" + furniture.img} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${furniture.make}</span></p>
                <p>Model: <span>${furniture.model}</span></p>
                <p>Year: <span>${furniture.year}</span></p>
                <p>Description: <span>${furniture.description}</span></p>
                <p>Price: <span>${furniture.price}</span></p>
                <p>Material: <span>${furniture.material}</span></p>
                <div>
                    <a href="/edit/${furniture._id}" class="btn btn-info" style="display: ${furniture._ownerId === localStorage.ownerId ? 'inline' : 'none'}">Edit</a>
                    <a href="#" id=${furniture._id} class="btn btn-red" style="display: ${furniture._ownerId === localStorage.ownerId ? 'inline' : 'none'}">Delete</a>
                </div>
            </div>
        </div>
`

const getDetails = (detailsId) => {
    return fetch(`http://localhost:3030/data/catalog/${detailsId}`)
    .then(response => response.json())
}

export const detailsView = (ctx) => getDetails(ctx.params.detailsId)
.then(furniture => render(detailsTemplate(furniture), document.querySelector('.container')))