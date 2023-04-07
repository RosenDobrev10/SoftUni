import { get } from './api.js';


export async function getParts() {
    return get('/data/autoparts');
}

export async function getById(id) {
    return get('/data/autoparts/' + id);
}
