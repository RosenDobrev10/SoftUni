import * as api from './api.js';

// FILL ENDPOINTS WITH THE CORRECT ONES FROM THE WORD FILE AND NAME THE PROPERTY CORRECTLY
const endpoints = {
	getAll: '/data/products?sortBy=_createdOn%20desc',
	create: '/data/products',
	getById: '/data/products/',
	deleteById: '/data/products/',
	editById: '/data/products/',
	bought: '/data/bought',
	allBoughts: (productId) => `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
	hasBought: (productId, userId) => `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
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

export async function bought(id) {
	return api.post(endpoints.bought, id);
}

export async function allBoughts(id) {
	return api.get(endpoints.allBoughts(id));
}

export async function hasBought(id, userId) {
	return api.get(endpoints.hasBought(id, userId));
}
