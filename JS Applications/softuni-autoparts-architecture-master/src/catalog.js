import { getParts } from './data/data.js';

const catalogSection = document.getElementById('catalog');
const table = catalogSection.querySelector('#table');
const loading = document.createElement('p');
loading.innerHTML = 'Loading &hellip;';


export async function showCatalog() {
    document.querySelector('main').replaceChildren(catalogSection);

    table.replaceChildren(loading);

    const parts = await getParts();
    table.replaceChildren(...parts.map(createRow));
}

function createRow(record) {
    const element = document.createElement('tr');

    element.innerHTML = `
    <td>${record.label}</td>
    <td>€ ${record.price}</td>
    <td><a href="javascript:void(0)" data-id="${record._id}">Details</a></td>`;

    return element;
}