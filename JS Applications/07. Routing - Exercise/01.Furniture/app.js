import page from './node_modules/page/page.mjs'
import { html, render } from './node_modules/lit-html/lit-html.js'
import { loginView } from './views/login.js'
import { catalogView } from './views/catalog.js'
import { registerView } from './views/register.js'
import { logout } from './views/logout.js'
import { createView } from './views/create.js'
import { myPublicationsView } from './views/my-publications.js'
import { detailsView } from './views/details.js'

page('/login', loginView)
page('/catalog', catalogView)
page('/register', registerView)
page('/create', createView)
page('/my-publications', myPublicationsView)
page('/details/:detailsId', detailsView)



page.start()

document.getElementById('logoutBtn').addEventListener('click', logout)

export const updateInfo = () => {
    let userDiv = document.getElementById('user')
    let guestDiv = document.getElementById('guest')

    if (localStorage.length === 0) {
        userDiv.style.display = 'none'
        guestDiv.style.display = 'inline'
    } else {
        userDiv.style.display = 'inline'
        guestDiv.style.display = 'none'
    }
}
updateInfo()