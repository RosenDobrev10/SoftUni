import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/shoes?sortBy=_createdOn%20desc',
	create: '/data/shoes',
	getById: '/data/shoes/',
	deleteById: '/data/shoes/',
	editById: '/data/shoes/',
	search: (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
};

// CHANGE FUNCTION NAMES AND CHANGE THE ENDPOINTS
export async function getAll() {
	return api.get(endpoints.getAll);
}

export async function create(data) {
	return api.post(endpoints.create, data);
}

export async function getById(id) {
	return api.get(endpoints.getById + id);
}

export async function deleteById(id) {
	return api.del(endpoints.deleteById + id);
}

export async function editById(id, data) {
	return api.put(endpoints.editById + id, data);
}

export async function search(query) {
	return api.get(endpoints.search(query));
}

