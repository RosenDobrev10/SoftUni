import { login } from "../api/data.js"

let section = document.getElementById('loginPage')
section.remove()

let ctx = null

export function showLogin(context){
    ctx = context
    context.showSection(section)
}

const form = document.querySelector('form')
form.addEventListener('submit', onSubmit)

async function onSubmit(event){
    event.preventDefault()
    let formData = new FormData(form)
    let email = formData.get('email').trim()
    let password = formData.get('password').trim()

    await login(email, password)
    form.reset()
    ctx.goTo('home')
    ctx.updateNav()

}