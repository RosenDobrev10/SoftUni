import { login } from './data/auth.js';
import { addSubmitListener } from './util.js';

const loginSection = document.getElementById('login');
const loginForm = loginSection.querySelector('#login-form');
addSubmitListener(loginForm, onLogin);
let ctx = null;

export function showLogin(newCtx) {
    document.querySelector('main').replaceChildren(loginSection);
    ctx = newCtx;
}

async function onLogin({ email, password }) {
    await login(email, password);
    loginForm.reset();
    ctx.showView('home-link');
}