import { getById } from './data/data.js';

const detailsSection = document.getElementById('details');
const content = {
    id: detailsSection.querySelector('#part-id'),
    label: detailsSection.querySelector('#part-label'),
    price: detailsSection.querySelector('#part-price'),
    qty: detailsSection.querySelector('#part-qty'),
};

export async function showDetails(id) {
    document.querySelector('main').replaceChildren(detailsSection);

    content.id.textContent = 'Loading...';
    content.label.textContent = 'Loading...';
    content.price.textContent = 'Loading...';
    content.qty.textContent = 'Loading...';

    const data = await getById(id);
    content.id.textContent = data._id;
    content.label.textContent = data.label;
    content.price.textContent = data.price;
    content.qty.textContent = data.qty;
}