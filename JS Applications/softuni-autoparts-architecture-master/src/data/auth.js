import { post } from './api.js';


export async function login(email, password) {
    const userData = await post('/users/login', { email, password });

    localStorage.setItem('userData', JSON.stringify({
        email: userData.email,
        id: userData._id,
        accessToken: userData.accessToken
    }));
}